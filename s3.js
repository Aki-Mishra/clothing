const { Rekognition } = require("aws-sdk");

const aws = require('aws-sdk');
const crypto = require('crypto');
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes)


// aws paremeter
const region = "ap-south-1";
const buketName ="my-second-bucket99"
const acessKeyId = "AKIA3LZ3TQSDLM4BOWGJ";
const secretAccessKey = "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";

const s3 = new aws.S3({
    region,
    apiVersion: 'latest',
    acessKeyId,
    secretAccessKey,
    siginatureVersion:'v4'
})

const url =  async  ()=>{
    const rawBytes =  await crypto.randomBytes(16);
    const imageName  = rawBytes.toString('hex')
    
    const prams = ({
        Bucket: buketName,
        Key: imageName,
        Expires: 600
    })
    
    const uploadUrl = await s3.getSignedUrlPromise('putObject', prams);
    return uploadUrl
}

const genneratedURL = url()
module.exports = genneratedURL