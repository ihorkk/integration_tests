FROM node:14

RUN npm install -g serverest@latest

EXPOSE 3000

CMD ["serverest"]