import wget

def downloadPhoto(url: str, name: str):
    response = wget.download(url, f"{name}.jpeg")


downloadPhoto('https://api.deepai.org/job-view-file/36ce240d-a04c-4511-a2e6-13be9ad038be/outputs/output.jpg', "imagine")