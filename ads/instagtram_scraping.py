import requests
import csv
import random


csv_columns = ['id', 'name',
               'comments', 'likes', 'followers', 'description', 'brand_type']
csv_file = 'data.csv'

brand_len_data = 0
followers = id = 0
fullName = ""
local_data = []

def first_api_call(url: str, brand_type: str) -> str:
    global brand_len_data, followers, id, fullName, local_data

    response = requests.get(url=url).json()
    followers = response['graphql']['user']['edge_followed_by']['count']

    fullName = response['graphql']['user']['full_name']
    id = response['graphql']['user']['id']

    posts = response['graphql']['user']['edge_owner_to_timeline_media']

    if posts['page_info'].get('has_next_page') and posts['page_info']['has_next_page'] == True:
        nextCursor = posts['page_info']['end_cursor']
    else:
        nextCursor = None
    for post in posts['edges']:
        postInfo = post['node']
        comments = postInfo['edge_media_to_comment']['count']
        likes = postInfo['edge_liked_by']['count']
        description = postInfo['edge_media_to_caption']['edges'][0]['node']['text']
        post_data = {'id': id, 'name': fullName, 'comments': comments, "likes": likes, "followers": followers, "description": description, 'brand_type' : brand_type}
        local_data.append(post_data)

    return nextCursor


def next_requests(after: str, brand_type: str) -> str:
    global local_data, brand_len_data

    url = f"https://www.instagram.com/graphql/query/?query_hash=69cba40317214236af40e7efa697781d&variables=%7B%22id%22%3A%22{id}%22%2C%22first%22%3A12%2C%22after%22%3A%22{after}%22%7D"
    
    response = requests.get(url=url).json()
    metadata = response['data']['user']['edge_owner_to_timeline_media']
    
    if metadata['page_info'].get('has_next_page') and metadata['page_info']['has_next_page'] == True:
        nextCursor = metadata['page_info']['end_cursor']
    else:
        nextCursor = None
    posts = metadata['edges']
    for post in posts:
        postInfo = post['node']
        comments = postInfo['edge_media_to_comment']['count']
        likes = postInfo['edge_media_preview_like']['count']
        try:
            description = postInfo['edge_media_to_caption']['edges'][0]['node']['text']
        except Exception:
            description = ""
        description = description.replace('\n', '')
        post_data = {'id': id, 'name': fullName, 'comments': comments, "likes": likes, "followers": followers, "description": description, 'brand_type' : brand_type}
        local_data.append(post_data)
        if len(local_data) > 1000:
            write_csv(local_data)
            exit()
            return None
    
    return nextCursor


def write_csv(data):
    with open(csv_file, 'w', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
        for row in data:
            writer.writerow(row)


def read_brands() -> dict:
    with open('brands.csv', 'r') as f:
        reader = csv.reader(f)
        brands = {rows[0] : rows[1] for rows in reader}
    return brands

if __name__ == "__main__":

    brands = read_brands()
    url = "https://www.instagram.com/newyorkeronline"
    brand_type = "fashion"
    brand_len_data = 0
    first_url = url + "/?__a=1&__d=dis"
    after = first_api_call(first_url, brand_type)
    print(after, id)
    try:
        while (id != None and after != None):
            after = next_requests(after, brand_type)
            print(brand_len_data)
            brand_len_data += 12
    except Exception:
        write_csv(local_data)
    write_csv(local_data)


