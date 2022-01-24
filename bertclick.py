import pandas as pd
import numpy as np
import torch
import transformers
import pickle
import sys

from bs4 import BeautifulSoup
import requests

from transformers import BertJapaneseTokenizer
from tqdm import tqdm
tqdm.pandas()


class BertSequenceVectorizer:
    def __init__(self):
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        self.model_name = 'cl-tohoku/bert-base-japanese-whole-word-masking'
        self.tokenizer = BertJapaneseTokenizer.from_pretrained(self.model_name)
        self.bert_model = transformers.BertModel.from_pretrained(self.model_name)
        self.bert_model = self.bert_model.to(self.device)
        self.max_len = 512
            

    def vectorize(self, sentence : str) -> np.array:
        inp = self.tokenizer.encode(sentence)
        len_inp = len(inp)

        if len_inp >= self.max_len:
            inputs = inp[:self.max_len]
            masks = [1] * self.max_len
        else:
            inputs = inp + [0] * (self.max_len - len_inp)
            masks = [1] * len_inp + [0] * (self.max_len - len_inp)

        inputs_tensor = torch.tensor([inputs], dtype=torch.long).to(self.device)
        masks_tensor = torch.tensor([masks], dtype=torch.long).to(self.device)
        
        
        #seq_out, pooled_out = self.bert_model(inputs_tensor, masks_tensor)

        seq_out = self.bert_model(inputs_tensor, masks_tensor)[0]
        pooled_out = self.bert_model(inputs_tensor, masks_tensor)[1]

        if torch.cuda.is_available():    
            return seq_out[0][0].cpu().detach().numpy() # 0番目は [CLS] token, 768 dim の文章特徴量
        else:
            return seq_out[0][0].detach().numpy()


def cos_sim_matrix(matrix):
    
    d = matrix @ matrix.T  # item-vector 同士の内積を要素とする行列

    # コサイン類似度の分母に入れるための、各 item-vector の大きさの平方根
    norm = (matrix * matrix).sum(axis=1, keepdims=True) ** .5

    # それぞれの item の大きさの平方根で割っている
    return d / norm / norm.T

def cos_sim(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))


if __name__ == '__main__':

    # load_url = "https://www.dsk-cloud.com/blog/what-is-data-mart"
    load_url = sys.argv[1]
    html = requests.get(load_url)
    soup = BeautifulSoup(html.content, "html.parser")
    text = soup.find("body").text
    text = text.replace("\n", "")

    with open('/work_stream/annotation/bert_value.txt', 'rb') as f:
        bert_value_dict = pickle.load(f)

    BSV = BertSequenceVectorizer()
    text_value = BSV.vectorize(text)

    for bert_key in bert_value_dict:
        bert_value_dict[bert_key] = cos_sim(text_value, bert_value_dict[bert_key])
    
    dic2 = sorted(bert_value_dict.items(), key=lambda x:x[1])

    import psycopg2 as pg

    conn=pg.connect("host='131.113.101.12' port=5432 dbname=saeki user=saeki password='yui1554'")
    cur = conn.cursor()

    i=0
    for anno in dic2:
        anid = int(anno[0])
        cur.execute("UPDATE new_annotation SET rank=%s where anid=%s",(i,anid,))
        i = i + 1

    conn.commit()
    conn.close()

    print("complete!")

    # sample_df['text_feature'] = sample_df['text'].progress_apply(lambda x: BSV.vectorize(x))
    # print(sample_df.head(6))

    # f2 = open('./exp_abst/prog_media.txt', 'wb')
    # list_row = cos_sim_matrix(np.stack(sample_df.text_feature))
    # pickle.dump(list_row, f2)
    # f2.close()


    # print(cos_sim_matrix(np.stack(sample_df.text_feature))[0])