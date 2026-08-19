#!/usr/bin/env python3
"""
Baixa as fotos reais usadas na galeria do Raiz Café para dentro desta pasta
(imgs/), e imprime o trecho de HTML já apontando para os arquivos locais.

Por que este script existe:
O ambiente onde a página foi gerada só tem acesso de rede a repositórios de
pacotes (PyPI, npm, GitHub etc.), então não foi possível baixar as fotos do
Unsplash diretamente para a pasta do projeto. A página funciona normalmente
do jeito que está (as fotos são carregadas direto do Unsplash), mas se você
quiser os arquivos salvos localmente, é só rodar este script na sua máquina.

Como usar:
    python3 baixar-imagens.py

Requisitos: Python 3 com a biblioteca padrão (nenhuma dependência externa).
"""

import urllib.request
import os

# (nome do arquivo local, URL da foto em alta resolução)
IMAGENS = [
    ("graos-torrados.jpg", "https://images.unsplash.com/photo-1753837787691-84a06d715d24?auto=format&fit=crop&w=1400&q=80"),
    ("ambiente-cafeteria.jpg", "https://images.unsplash.com/photo-1755163412328-df3b4c2b172e?auto=format&fit=crop&w=1200&q=80"),
    ("latte-art.jpg", "https://images.unsplash.com/photo-1761271046396-97d231b59dd7?auto=format&fit=crop&w=1400&q=80"),
    ("maquina-espresso.jpg", "https://images.unsplash.com/photo-1511287830614-09802dd6cd79?auto=format&fit=crop&w=1400&q=80"),
    ("padaria-balcao.jpg", "https://images.unsplash.com/photo-1666114170628-b34b0dcc21aa?auto=format&fit=crop&w=1200&q=80"),
    ("servindo-cafe.jpg", "https://images.unsplash.com/photo-1561336062-d28ae6bfcca8?auto=format&fit=crop&w=1400&q=80"),
]

PASTA = os.path.dirname(os.path.abspath(__file__))


def baixar():
    for nome_arquivo, url in IMAGENS:
        destino = os.path.join(PASTA, nome_arquivo)
        print(f"Baixando {nome_arquivo}...")
        try:
            urllib.request.urlretrieve(url, destino)
            print(f"  OK -> {destino}")
        except Exception as erro:
            print(f"  Falhou: {erro}")

    print("\nPronto! Agora troque, no index.html, cada src que aponta para")
    print("images.unsplash.com pelo caminho local correspondente, por exemplo:")
    print('  src="https://images.unsplash.com/photo-1753837787691-..."')
    print('  vira')
    print('  src="imgs/graos-torrados.jpg"')


if __name__ == "__main__":
    baixar()
