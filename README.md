# Prerequisites
- RavenDB 7.0.1+
- Node.js 22.14+
- pnmp 10.7.1+ - https://pnpm.io/installation
- **OpenAI API Key**

# Steps to run
**RavenDB**
1. Run RavenDB, create database `my-product-search-app`
2. Create sample data in this db
3. Create AI ETL connected to OpenAI **large** model - name it "**openai-large**" - set collection to Products and path "Name"

**Application**
1. Inside app directory, run `pnpm install`
2. Run with `pnpm dev`

---
Feel free to add more Product documents like "Coca-cola", "Continental Premium Touch Tires" etc. - easiest way to do that is to clone existing ones in the Studio and edit Name
