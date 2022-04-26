

gcloud services enable sqladmin.googleapis.com
gcloud sql instances create gcp5  --database-version=MYSQL_8_0_28 --region=us-central1
gcloud sql users set-password root --host=% --instance gcp5 --password telus2022
gcloud sql connect gcp5 --user=root


mkdir gcf_sql
cd gcf_sql/
nano index.js
nano package.json


gcloud sql instances describe gcp5 | grep connectionName | awk {'print $2'}
gsutil mb -p gcp-5-348415 gs://ahiguegcp5
gcloud functions deploy getUsers --runtime nodejs10 --trigger-http
gcloud beta functions describe getUsers | grep url | awk {'print $2'}
