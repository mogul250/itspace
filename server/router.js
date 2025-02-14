import { Router, json } from 'express';
import pkg from 'aws-sdk';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import archiver from 'archiver';
import { createWriteStream, readdir, lstatSync, writeFileSync } from 'fs';
let secretkey = "myguy";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import dotenv from "dotenv";
dotenv.config();
let router = Router();
// import stripePackage from 'stripe';
// import Paystack from 'paystack';
import {EventEmitter} from 'events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
import { server, database } from './handler.js';
import { assets, page } from './page.controller.js';
import sharp from 'sharp';
import fetch from 'node-fetch';
import { sendmail } from './mail.sender.controller.js';
import Flutterwave from 'flutterwave-node-v3';
import passport  from 'passport'; 
import './passport.js';
import { Server  } from "socket.io";
const { S3 } = pkg;
const pSC = process.env.PAYSTACK_SECRET_KEY,MTN_AU = process.env.MTN_AU_AK,MTN_COLL_SK = process.env.MTN_COLL_SK,MTN_DISB_SK = process.env.MTN_DISB_SK,MTN_API_LINK = process.env.MTN_API_LINK,MTN_ENV = process.env.MTN_ENV
const 
flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
let q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m
export const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
io.on('connection', function (socket) {
    console.log('A user connected');
    socket.on('message', (data) => {
        console.log(`Received message: ${data}`);
		    socket.emit('acknowledge', 'Message received');
    });
    socket.on('refresh',(message)=>{
		console.log(message)
		io.emit('datarefreshed','please refresh')
	})
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

	
});	
const s3 = new S3({
	accessKeyId: process.env.AWS_ACCES_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCES_KEY
});
router.use(passport.initialize()); 
router.use(passport.session());
	router.get('/api/download/:folder', (req, res) => {
		const folderPath = join(__dirname, '..', req.params.folder); // assuming the target directory is in the parent directory
		const zipFileName = `${req.params.folder}.zip`;
		const output = createWriteStream(zipFileName);
		const archive = archiver('zip', {
		zlib: { level: 9 }
		});
	
		// Set the headers for the response
		res.attachment(zipFileName);
		res.setHeader('Content-Type', 'application/zip');
	
		// Pipe the archive to the response
		archive.pipe(res);
	
		// Append all the files in the directory to the archive
		readdir(folderPath, (err, files) => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}
	
		files.forEach((file) => {
			const filePath = join(folderPath, file);
	
			// Ensure that the file is not a directory before adding it to the archive
			if (lstatSync(filePath).isFile()) {
			archive.file(filePath, { name: file });
			}
		});
	
		// Finalize the archive and send it to the client
		archive.finalize();
		});
	
		// Log when the archive is finished
		output.on('close', () => {
		console.log(`${zipFileName} has been created and sent to the client.`);
		});
	});
	router.get('/api/images/:filename', async (req, res) => {
		const { filename } = req.params;
		const params = {
			Bucket: 'itspacerwanda',
			Key: `images/${filename}`
		};
		try {
			const data = await s3.getObject(params).promise();
			res.set({
				'Content-Type': 'image/jpeg',
				'Content-Length': data.length
			});
			res.send(data.Body);
		} catch (error) {
			console.log(error.toString());
			res.status(500).send('Error retrieving file from S3');
		}
		// const path = `../images/${filename}`; 
		
		// fs.readFile(path, (err, data) => {
		// if (err) {
		// 	res.status(404).send('File not found');
		// 	return;
		// }
		
		// res.writeHead(200, {
		// 	'Content-Type': 'image/jpeg', // set the content type based on your file type
		// 	'Content-Length': data.length
		// });
		// res.end(data);
		// });
	});
	router.get('/api/feedback-imgz/:filename', async (req, res) => {
		const { filename } = req.params;
		const params = {
			Bucket: 'itspacerwanda',
			Key: `feedback-imgz/${filename}`
		};
		try {
			const data = await s3.getObject(params).promise();
			res.set({
				'Content-Type': 'image/jpeg',
				'Content-Length': data.length
			});
			res.send(data.Body);
		} catch (error) {
			console.log(error.toString());
			res.status(500).send('Error retrieving file from S3');
		}
		// const path = `../feedback-imgz/${filename}`;
		// fs.readFile(path, (err, data) => {
		// 	if (err) {
		// 		res.status(404).send('File not found');
		// 		return;
		// }
		
		// res.writeHead(200, {
		// 	'Content-Type': 'image/jpeg', // set the content type based on your file type
		// 	'Content-Length': data.length
		// });
		// res.end(data);
		// });
	});
	router.get('/api/product-imgz/:filename', async (req, res) => {
		const { filename } = req.params;
		const params = {
			Bucket: 'itspacerwanda',
			Key: `product-imgz/${filename}`
		};
		try {
			const data = await s3.getObject(params).promise();
			res.set({
			'Content-Type': 'image/jpeg',
			'Content-Length': data.length
			});
			res.send(data.Body);
		} catch (error) {
			console.log(error.toString());
			res.status(500).send('Error retrieving file from S3');
		}
		// const path = `../product-imgz/${filename}`;
		
		// fs.readFile(path, (err, data) => {
		// if (err) {
		// 	res.status(404).send('File not found');
		// 	return;
		// }
		
		// res.writeHead(200, {
		// 	'Content-Type': 'image/jpeg', // set the content type based on your file type
		// 	'Content-Length': data.length
		// });
		// res.end(data);
		// });
	});
	router.get('/api/brands/:filename', async (req, res) => {
		const { filename } = req.params;
		const params = {
			Bucket: 'itspacerwanda',
			Key: `brands/${filename}`
		};
		try {
			const data = await s3.getObject(params).promise();
			res.set({
				'Content-Type': 'image/jpeg',
				'Content-Length': data.length
			});
			res.send(data.Body);
		} catch (error) {
			console.log(error.toString());
			res.status(500).send('Error retrieving file from S3');
		}
		// const path = `../brands/${filename}`; 
		// fs.readFile(path, (err, data) => {
		// if (err) {
		// 	res.status(404).send('File not found');
		// 	return;
		// }
		
		// res.writeHead(200, {
		// 	'Content-Type': 'image/jpeg', // set the content type based on your file type
		// 	'Content-Length': data.length
		// });
		// res.end(data);
		// });
	});
	router.post('/api/search', async (req, res) => {
		try {
			n = req.body.needle;
			database.query(`SELECT products.id as prodid,products.availability, products.name as pname, products.specifications as pspecs,JSON_EXTRACT(products.conditions, '$') AS conditions,products.images as pimgs, products.orders as porders, categories.name as catname,categories.id as catid, subcategories.name as subcatname,subcategories.id as subcatid, brands.name as brandname,brands.id as brandid,families.name as famname, families.id as famid, usedin.id as usedinid, usedin.name as usedinname FROM (((((products inner join brands on products.brand = brands.name)inner join families on products.family = families.name)inner join categories on products.category = categories.name)inner join subcategories on  products.subcategory = subcategories.name)inner join usedin on products.usedin = usedin.name) where  products.name like '%${n}%' or products.category like '%${n}%' or products.subcategory like '%${n}%' or products.brand like '%${n}%' or products.description like '%${n}%'`,(error,result)=>{
				if (error) return res.send({ success: false, message: error});
				const products = JSON.parse(JSON.stringify(result))
				products.forEach(prods=>{
					try {
						products[products.indexOf(prods)].conditions = JSON.parse(products[products.indexOf(prods)].conditions)
						products[products.indexOf(prods)].pspecs = JSON.parse(products[products.indexOf(prods)].pspecs)
						products[products.indexOf(prods)].pimgs = JSON.parse(products[products.indexOf(prods)].pimgs)
						
					} catch (error) {
						
					}
				})
				r = {categories: null,subcategories:null,brands: null,series: null,prods: null};
				r.prods = products
				database.query(`select id,name,image from categories where name like '%${n}%'`,(er,categories)=>{
					const cats = JSON.parse(JSON.stringify(categories));
					r.categories = cats
					database.query(`select families.id as famid,families.name as famname,brands.id as brandid,families.image,brands.name as brandname from families,brands where families.name like '%${n}%' and families.brand = brands.id`,(er,families)=>{
						if (er) return res.send({success: false, message: er})
						f = JSON.parse(JSON.stringify(families));
						r.series = f
						database.query(`select brands.id,brands.name,image from brands where name like '%${n}%'`,(erri,brands)=>{
							b = JSON.parse(JSON.stringify(brands));
							r.brands = b;
							database.query(`select subcategories.id as id,subcategories.name as name,subcategories.image,categories.id as catid,categories.name as catname from subcategories inner join categories on subcategories.category = categories.id where subcategories.name like '%${n}%'`,(erro,subcats)=>{
								if (erro) return res.send({success:false, message: erro})
								s = JSON.parse(JSON.stringify(subcats));
								r.subcategories = s;
								res.send({ success: true, message: r});
							})
						})
					})
					})
				});	 
		} catch (error) {
		res.send({ success: false, message: "oops an error occured" });
		}
	});
	router.get('/api/hello',async (req,res)=>{
		res.send({response: 'hi'});
	})
	router.get('/api/getprods', async (req, res) => {
		try {
		  database.query("SELECT products.id as prodid,products.availability, products.name as pname, products.specifications as pspecs,JSON_EXTRACT(products.conditions, '$') AS conditions,products.images as pimgs, products.orders as porders, categories.name as catname,categories.id as catid, subcategories.name as subcatname,subcategories.id as subcatid, brands.name as brandname,brands.id as brandid,families.name as famname, families.id as famid, usedin.id as usedinid,products.description, usedin.name as usedinname FROM (((((products inner join brands on products.brand = brands.name)inner join families on products.family = families.name)inner join categories on products.category = categories.name)inner join subcategories on  products.subcategory = subcategories.name)inner join usedin on products.usedin = usedin.name) order by products.category,products.name asc ",(error,result)=>{
			if (error) return res.send({ success: false, message: "oops an error occured"});
			const products = JSON.parse(JSON.stringify(result))
			products.forEach(prods=>{
				try {
					products[products.indexOf(prods)].conditions = JSON.parse(products[products.indexOf(prods)].conditions)
					products[products.indexOf(prods)].pspecs = JSON.parse(products[products.indexOf(prods)].pspecs)
					products[products.indexOf(prods)].pimgs = JSON.parse(products[products.indexOf(prods)].pimgs)
					
				} catch (error) {
					
				}
			})
			res.send({ success: true, message: products});
		  });
		} catch (error) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});
	router.post('/api/getprodswthcndtn', async (req, res) => {
		try {
		let c = req.body.cntn;
		c = gnrtctn(c)
		  database.query(`SELECT products.id as prodid, products.name as pname,products.availability, products.specifications as pspecs,JSON_EXTRACT(products.conditions, '$') AS conditions,products.images as pimgs, products.orders as porders, categories.name as catname,categories.id as catid, subcategories.name as subcatname,subcategories.id as subcatid, brands.name as brandname,brands.id as brandid,families.name as famname, families.id as famid, usedin.id as usedinid, usedin.name as usedinname FROM (((((products inner join brands on products.brand = brands.name)inner join families on products.family = families.name)inner join categories on products.category = categories.name)inner join subcategories on  products.subcategory = subcategories.name)inner join usedin on products.usedin = usedin.name) ${c}`,(error,result)=>{
			if (error) return res.status(500).send({ success: false, message: "internal server error"});
			const products = JSON.parse(JSON.stringify(result))
			products.forEach(prods=>{
				try {
					products[products.indexOf(prods)].conditions = JSON.parse(products[products.indexOf(prods)].conditions)
					products[products.indexOf(prods)].pspecs = JSON.parse(products[products.indexOf(prods)].pspecs)
					products[products.indexOf(prods)].pimgs = JSON.parse(products[products.indexOf(prods)].pimgs)
					
				} catch (error) {
					
				}
			})
			res.send({ success: true, message: products});
		  });
		} catch (error) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});
	router.post('/api/getprodswthorcndtn', async (req, res) => {
		try {
			let c = req.body.cntn;
			c = gnrtorctn(c)
			database.query(`SELECT products.id as prodid, products.name as pname,products.availability, products.specifications as pspecs,JSON_EXTRACT(products.conditions, '$') AS conditions,products.images as pimgs, products.orders as porders, categories.name as catname,categories.id as catid, subcategories.name as subcatname,subcategories.id as subcatid, brands.name as brandname,brands.id as brandid,families.name as famname, families.id as famid, usedin.id as usedinid, usedin.name as usedinname FROM (((((products inner join brands on products.brand = brands.name)inner join families on products.family = families.name)inner join categories on products.category = categories.name)inner join subcategories on  products.subcategory = subcategories.name)inner join usedin on products.usedin = usedin.name) ${c}`,(err,result)=>{
				if (err) return res.status(500).send({ success: false, message: err});
				const products = JSON.parse(JSON.stringify(result))
				products.forEach(prods=>{
					try {
						products[products.indexOf(prods)].conditions = JSON.parse(products[products.indexOf(prods)].conditions)
						products[products.indexOf(prods)].pspecs = JSON.parse(products[products.indexOf(prods)].pspecs)
						products[products.indexOf(prods)].pimgs = JSON.parse(products[products.indexOf(prods)].pimgs)
						
					} catch (error) {
						
					}
				})
				res.send({ success: true, message: products});
			});
		} catch (error) {
		  res.send({ success: false, message: error});
		}
	});
	router.post('/api/getproduct', async (req, res) => {
		try {
		  database.query("SELECT products.id as prodid, products.quantity,products.availability,products.description,products.shipment_info, products.name as pname, products.specifications as pspecs,JSON_EXTRACT(products.conditions, '$') AS conditions,products.images as pimgs, products.orders as porders, categories.name as catname,categories.id as catid, subcategories.name as subcatname,subcategories.id as subcatid, brands.name as brandname,brands.id as brandid,families.name as famname, families.id as famid, usedin.id as usedinid, usedin.name as usedinname FROM (((((products inner join brands on products.brand = brands.name)inner join families on products.family = families.name)inner join categories on products.category = categories.name)inner join subcategories on  products.subcategory = subcategories.name)inner join usedin on products.usedin = usedin.name)  where products.id = ?",[req.body.id],async (error,result)=>{
			if (error) return res.send({ success: false, message: "oops an error occured"});
			const products = JSON.parse(JSON.stringify(result))
			products.forEach(prods=>{
				try {
					products[products.indexOf(prods)].conditions = JSON.parse(products[products.indexOf(prods)].conditions)
					products[products.indexOf(prods)].pspecs = JSON.parse(products[products.indexOf(prods)].pspecs)
					products[products.indexOf(prods)].pimgs = JSON.parse(products[products.indexOf(prods)].pimgs)
					products[products.indexOf(prods)].shipment_info = JSON.parse(products[products.indexOf(prods)].shipment_info)
					
				} catch (error) {
					
				}
			})
			if (products.length > 0) {
					f = await query(`select users.firstname,users.lastname,feedbacks.image,feedbacks.message,feedbacks.rate,feedbacks.product from ((feedbacks inner join users on feedbacks.user = users.id)inner join products on products.id = feedbacks.product) where users.status = 'active' and feedbacks.product = '${products[0].prodid}'`)
					if (f) {
						(f.length)? Object.assign(products[0],{feedbacks:f}): Object.assign(products[0],{feedbacks:[]})
						Object.assign(products[0],{feedbacks:f})
					}
					res.send({ success: true, message: products});	
			} else {
				res.status(404).json({ success: false, message: "product not found" });
			}
		  });
		} catch (err) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});	
	router.post('/api/editprodinfo',async (req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,async (error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								i = req.body.prodinfo;
								p = req.body.product;
								z = generateUniqueId();
								v = await query(`select images from products where id = '${p}'`)
								v = JSON.parse(v[0].images)
								for (const image of v) {
									try {
										const params = {
											Bucket: 'itspacerwanda',
											Key: `procuct-imgz/${image}`
										  };
										  
										  s3.deleteObject(params, function(err, data) {
											if (err) {
											  console.log('Error deleting file: ' + err);
											} else {
											  console.log('File deleted successfully');
											}
										  });
										// fs.unlink(`../product-imgz/${image}`, (err) => {
										// 	console.log('File deleted');
										//   });
									} catch (error) {
										console.log('file not found')
									}
								}
								l = i.images
								a = []
								for (const image of l) {
									e = gfxt(image)
									let n
									const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
									const imageBuffer = Buffer.from(base64Data, 'base64');
									const watermarkImagePath = join(__dirname,'..','icons', 'favicon.png'),
									finalImageBuffer = await processImage(imageBuffer,watermarkImagePath)
									const fileType = await getMimeType(imageBuffer);
									n = `${generateUniqueId()}.${fileType.ext}`
									const params = {
											Bucket: 'itspacerwanda',
											Key: `product-imgz/${n}`,
											ContentType: fileType.mime,
											Body: finalImageBuffer,
										};
									s3.upload(params, function(err, data) {
										if (err) {
											console.log("Error uploading file: ", err);
										} else {
											console.log("File uploaded successfully. Location: ", data.Location);
										}
									});
									a.push(n)
								}
								c = i.conditions;
								c.forEach(condition=>{
									Object.assign(c[c.indexOf(condition)],{newprice: condition.price, promotion: null})
								})
								database.query(`update products set name= ?, category= ?, subcategory= ?, usedin= ?, brand= ?, family= ?, quantity= ?, description= ?, specifications= ?, images = ?,conditions = ?,availability= ?, shipment_info= ? where id = ?`,[i.name,i.catid,i.subcatid,i.usedin,i.brandid,i.famid,i.quantity,i.description,JSON.stringify(i.specifications),JSON.stringify(a),JSON.stringify(c),i.availability,JSON.stringify(i.dinfos),p],(error,result)=>{
									console.log(error)
									if (error) return res.send({success: false, message: "Oops an error occured"})
									if(result.affectedRows > 0){
										res.send({success:true, message: "product info updated successfully"})
									}else{
										res.send({success:false, message: "product not found"})
									}
								})
							} catch (err) {
								console.log(err)
								res.status(500).send({success: false, message: "an error occurred while processing your request"})
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/editprodpri',async (req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								p = req.body.product;
								c = req.body.conditions;
								c.forEach(cond=>{
									database.query(`UPDATE products SET conditions = JSON_SET(conditions, '$[${cond.condid}].price', ${cond.price}, '$[${cond.condid}].newprice', ${cond.price}, '$[${cond.condid}].promotion', null)
									WHERE id = '${p}'`,(error,result)=>{
										if (error) return res.send({success: false, message: 'oops an error occured'})
										
									})
								})
								res.send({success:true, message: "product info updated successfully"});
							} catch (err) {
								res.send({success: false, message: "err"})
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/getusers',async (req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`, async (error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								r = await query('select * from users order by firstname asc')
								res.send({success:true, message: r});
							} catch (err) {
								res.send({success: false, message: "err"})
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/getuserinfo',async (req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`, async (error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								u={}
								i = req.body.userid
								v = await query(`select firstname,lastname from users where id = '${i}'`)
								o = await query(`select * from orders where uid = '${i}'`)
								Object.assign(u,{orders: o})
								Object.assign(u,{info: v[0]})
								f = await query(`select feedbacks.id,feedbacks.message,feedbacks.dateadded,feedbacks.image,feedbacks.rate,products.name as pname from feedbacks inner join products on feedbacks.product = products.id where user = '${i}'`)
								Object.assign(u,{feedbacks: f})
								res.send({success:true, message: u});
							} catch (err) {
								res.send({success: false, message: "err"})
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/getuser',async (req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					try {
						r = await query(`select
						 CONCAT(firstname," ",lastname) as Full_name, 
						 phone, 
						 email,
						 users.status as status,
						 addresses,
						 COALESCE(
							CONCAT('[',
							  GROUP_CONCAT(
								JSON_QUOTE(o.status) SEPARATOR ','  
							  ),
							']'),
						  '[]') AS ost
						 from 
						 users
						 left join orders as o on o.uid = '${t}'
						  where users.id = '${t}'`)
						if(!r) return res.status(500).send({success: false, message : 'internal server error'})
						let obj = {p_orders: 0, d_orders: 0, t_orders: 0, n_orders: 0}
						if (r.length) {
							r = r[0]
							r.addresses = JSON.parse(r.addresses)
							r.ost = JSON.parse(r.ost)
							obj.t_orders = r.ost.length
							r.ost.forEach(status=>{
								if (status == 'new') {
									obj.n_orders+=1
								}else if (status == 'pending') {
									obj.p_orders+=1
								}else if (status == 'delivered') {
									obj.d_orders+=1
								}
							})
							delete r.ost
							Object.assign(r, {p_orders: obj.p_orders, d_orders: obj.d_orders, t_orders: obj.t_orders, n_orders: obj.n_orders})
							res.send({success:true, message: r});
						}else{
							res.status(404).send({success:false, message: "user not found"});
							
						}
					} catch (err) {
						console.log(err)
						res.send({success: false, message: "err"})
					}
						
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.get('/api/gettopselling',async (req,res)=>{
		try {
			database.query("SELECT products.id as prodid, products.name as pname, products.availability, products.specifications as pspecs,JSON_EXTRACT(products.conditions, '$') AS conditions,products.images as pimgs, products.orders as porders, categories.name as catname,categories.id as catid, subcategories.name as subcatname,subcategories.id as subcatid, brands.name as brandname,brands.id as brandid,families.name as famname, families.id as famid, usedin.id as usedinid, usedin.name as usedinname FROM (((((products inner join brands on products.brand = brands.name)inner join families on products.family = families.name)inner join categories on products.category = categories.name)inner join subcategories on  products.subcategory = subcategories.name)inner join usedin on products.usedin = usedin.name) where orders >=(SELECT avg(orders) from products) and products.category != 'services' limit 0,7",(error,result)=>{
				if (error) return res.send({ success: false, message: "oops an error occured"});
				const products = JSON.parse(JSON.stringify(result))
				products.forEach(prods=>{
					try {
						products[products.indexOf(prods)].conditions = JSON.parse(products[products.indexOf(prods)].conditions)
						products[products.indexOf(prods)].pspecs = JSON.parse(products[products.indexOf(prods)].pspecs)
						products[products.indexOf(prods)].pimgs = JSON.parse(products[products.indexOf(prods)].pimgs)
						
					} catch (error) {
						
					}
				})
				res.status(201).send({success:true,message:products})
		 
			  });
		} catch (error) {
			
		}
	})
	router.post('/api/signup',async (req,res)=>{
		try {
			a= req.body.firstname
			b = req.body.lastname
			c = req.body.email
			d = req.body.password
			e = generateUniqueId()
				checkemail(req, res, (dec) => {
					if (dec.success) {
						res.send({success: false, message: "the submitted email is in use"})
					} else {
						database.query(`insert into users (id,firstname,lastname,email,password,addresses) values ('${e}','${a}','${b}','${c}','${d}','[]')`,(error,result,fields)=>{
							if (error) return res.send({success: false, message: error})
							res.send({success: true, message: "account created successfully"})
						})
					}
				});
			
		} catch (error) {
			res.send({sucess: false, message: "Oops an error occured"});
		}
	})
	router.post('/api/login',(req,res)=>{
		d = req.body.email
		e = req.body.password
		try {
			database.query(`SELECT id,firstname,lastname,email,phone,status FROM users  WHERE email = '${d}' AND password = '${e}'`,(error,result,fields)=>{
				if (error) return res.send({success: false, message: 'oops an error occured'})
				if (result.length > 0) {
					t = addToken(JSON.parse(JSON.stringify(result[0])));
					if (result[0].status == 'banned') return res.status(403).json({success: false, message : {content: "user was banned"}})
					res.send({success: true, message : {content: "logged in successfully", token: t}})
				} else {
					res.status(404).json({success: false, message : {content: "user not found"}})
				}
			})
		} catch (error) {
			
		}
	})
	router.post('/api/rstpsswrd',(req,res)=>{
		t = req.body.token
		authenticateToken(t,async (token)=>{
			if (token.success) {
				u = token.token.id
			}
			p = req.body.password
			try {
				database.query(`SELECT id,firstname,lastname,email,status FROM users  WHERE id = '${u}'`,(error,result,fields)=>{
					if (error) return res.send({success: false, message: 'oops an error occured'})
					if (result.length > 0) {
						database.query(`UPDATE users set password = '${p}', fa2 = '${generateUniqueId()}' where id = '${u}' AND fa2 = '${token.token.fa}'`)
						res.send({success: true, message : "password changed successfully!"})
					} else {
						res.status(404).json({success: false, message : {content: "user not found"}})
					}
				})
			} catch (error) {
				res.status(500).json({success: false, message : 'internal server error'})
			}
		})
	})
	router.post('/api/gntrrstlnk',(req,res)=>{
		d = req.body.email
		try {
			database.query(`SELECT id,status,firstname FROM users  WHERE email = ?`,[d],(error,result,fields)=>{
				if (error) return res.send({success: false, message: 'oops an error occured'})
				if (result.length > 0) {
					if (result[0].status == 'banned') return res.status(403).json({success: false, message : {content: "user was banned"}});
					let id = generateUniqueId(),
					obj = {id: result[0].id, fa : id}
					database.query(`UPDATE users set fa2 = '${id}' where id = '${result[0].id}'`)
					t = addToken(obj);
					let link = `https://itspace.rw/reset-password/${t}`
					const emailContent = `
										<!DOCTYPE html>
										<html lang="en">
										<head>
										<meta charset="UTF-8">
										<meta name="viewport" content="width=device-width, initial-scale=1.0">
										<title>order placed</title>
										<style>
											/* Add your custom CSS styles here */
											body {
											font-family: Arial, sans-serif;
											margin: 0;
											padding: 0;
											background-color: #ffffff;
											}
											.container {
											max-width: 600px;
											margin: 0 auto;
											padding: 20px;
											background-color: #ffffff;
											box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
											}
											h1 {
											color: #333333;
											margin-top: 0;
											}
											p {
											color: #000;
											line-height: 1.5;
											}
											.footer {
											background-color: #f2f2f2;
											padding: 20px;
											box-sizing: border-box;
											width: 100%;
											position: fixed;
											bottom: 0px;
											text-align: center;
											}
										</style>
										</head>
										<body>
										<div class="container">
										<p style="text-align: center"> <img src="https://itspace.rw/icons/favicon.png" style="width: 300px;height: 152px,display:flex;justify-content:center;align-items:center;overflow-wrap:break-word"></p>
											<h1>Hi, ${result[0].firstname} </h1>
											<p style="font-size:16px; text-transform: capitalize;">you requested for a password reset on ITSPACE</p>
											<p style="font-size: 18px; font-weight: bold;">click <a href="${link}">here</a> for further instructions</p>
										</div>
										<div class="footer">
											<p>&copy; ${new Date().getFullYear()} ITSPACE LTD. All rights reserved.</p>
										</div>
										</body>
										</html>
									`,emailMessage = {subject: 'password Reset Request'}
									sendmail(d,emailMessage,emailContent)
					res.send({success: true, message : {content: `reset password instructions sent to  ${d} successfully!, check your inbox`}})
				} else {
					res.status(404).json({success: false, message : {content: "user not found"}})
				}
			})
		} catch (error) {
			
		}
	})
	router.post('/api/checkemail',(req,res)=>{
		checkemail(req,res, (dec)=>{
			res.send(dec);
		})
	})
	router.post('/api/addtowishlist', async(req,res)=>{
		authenticateToken(req.body.token, async (tokendata)=>{
			if (tokendata.success ==true) {
				u = tokendata.token.id
				k = await query(`select * from users where id = '${u}'`)
				if (!k) return res.status(404).send({success: false, message: 'user not found'})
				p = req.body.pid
				try {
					r = await query(`select * from products where id = '${p}'`)
					if (!r) return res.status(500).send({success: false, message: "internal server error"})
					if (r.length <= 0) {
						return res.send({success: false, message: "product not found"});
					} 
					try {
						h = await query(`select products from wishlist where uid = '${tokendata.token.id}'`)
						if (!h) return res.status(500).send({success: false, message: "internal server error"})
						
						if (h.length>0) {
							h = JSON.parse(h[0].products)
							f = 0
							h.forEach(prodid => {
								if (prodid == p) {
									f=1
									h.splice(h.indexOf(prodid),1)
									a= 'removed from'
								}
							});
							if (f==0) {
								h.push(p)
								a = 'added to'
							}
							try {
								database.query(`update wishlist set products = '${JSON.stringify(h)}' where uid = '${tokendata.token.id}'`,(err,result)=>{
									if (err) return res.send(err);
									res.send({success: true, message: `product ${a} wishlist successfully`})
								})
							} catch (error) {
								res.send({success: false, message: error})	
							}
						} else {
							try {
								z = [];
								z.push(p);
								database.query(`insert into wishlist values ('${generateUniqueId()}','${tokendata.token.id}','${JSON.stringify(z)}')`,(rr,result)=>{
									if (rr) return res.send({success: false, message: 'oops an error occured'});
									res.send({success:true, message: 'item added to wishlist'})
								})
							} catch (error) {
								res.send({success: false, message: error});
							}
						}
					} catch (error) {
						res.send({success: false, message: error})
					}
				} catch (error) {
					res.send({success: false, message: error})
				}
			} else {
				res.send({success: false, message: 'invalid token'})
			}
		})
	})
	router.get('/api/addadmin', async(req,res)=>{
		q = await query("update admin set username= 'Adminos', password = 'Adminos'")
		if (!q) return res.send({success : false,message: 'oops an error occured'})
		res.send({success : true,message: 'Admin info resetted successfully'})
		io.emit('deleteadmintoken','dd')
	})
	router.post('/api/editadmin', async(req,res)=>{
				u = req.body.username
				p = req.body.password
				try {
					x = await query(`update admin set username = '${u}', password='${p}'`)
					if (!x) return res.send({success: false, message: "oops an error occured"});
					res.send({success: true, message: "admin info changed successfully"});
				} catch (error) {
					res.send({success: false, message: "Oops, an error occured"});
				}
	})
	router.post('/api/adminlogin', async(req,res)=>{
		u = req.body.username
		p = req.body.password
		try {
			database.query(`select id from admin where username = '${u}' and password = '${p}'`,async (error,result)=>{
				if (error) return res.send({success:false, message: "oopsa an error occured"})
				if (result.length > 0) {
					t = addToken(JSON.parse(JSON.stringify(result[0])));
					res.send({success: true, message: {content:"admin logged in successfully",token: t}})
				}else{
					res.send({success: false, message: "incorrect username or password"})
					
				}
			})
			
		} catch (error) {
			res.send({success: false , message: "Oops an error occured"});
		}
	})
	router.post('/api/addcategory',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								i = req.body.image[0] || 'tg'
								e = gfxt(i)
								n = `${generateUniqueId()}.${e}`
								const base64Data = i.replace(/^data:image\/\w+;base64,/, '');
								const bufferData = Buffer.from(base64Data, 'base64');
								const filePath = join(__dirname,'..','images', n);
								writeFileSync(filePath, bufferData);
								database.query(`insert into  categories(id,name,image) values('${generateUniqueId()}','${req.body.name}','${n}')`,(error,result)=>{
									if (error) return res.send({success: false, message: "Oops an error occured"})
									res.send({success:true, message: "category created"})
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.get('/api/getcats',async(req,res)=>{
		try {
			database.query(`select distinct subcategories.name,subcategories.image from categories inner join subcategories where categories.id = subcategories.category order by subcategories.dateadded asc`,(error,result)=>{
				if (error) return res.status(500).send({success: false, message: "Oops an error occured"})
				res.status(200).send({success:true, message: result})
			})
		} catch (error) {
			res.status(500).send({success: false, message: 'oops an error occured'})
		}
	})
	router.get('/api/getcategories',async(req,res)=>{
		try {
			database.query(`select * from categories`,(error,result)=>{
				if (error) return res.status(500).send({success: false, message: "Oops an error occured"})
				res.status(200).send({success:true, message: result})
			})
		} catch (error) {
			res.status(500).send({success: false, message: 'oops an error occured'})
		}
	})
	router.get('/api/getbrands',async(req,res)=>{
		try {
			database.query(`select distinct brands.name,brands.image from brands where brands.name != 'N/A'`,(error,result)=>{
				if (error) return res.send({success: false, message: "Oops an error occured"})
				res.send({success:true, message: result})
			})
		} catch (error) {
			res.send({success: false, message: 'oops an error occured'})
		}
	})
	router.post('/api/addbrand',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					i = req.body.image[0] || 'tg'
					e = gfxt(i)
					n = `${generateUniqueId()}.${e}`
					const base64Data = i.replace(/^data:image\/\w+;base64,/, '');
					const bufferData = Buffer.from(base64Data, 'base64');
					const filePath = join(__dirname,'..','brands', n);
					const params = {
						Bucket: 'itspacerwanda',
						Key: `brands/${n}`,
						Body: bufferData
					  };
					  s3.upload(params, function(err, data) {
						if (err) {
						  console.log("Error uploading file: ", err);
						} else {
						  console.log("File uploaded successfully. Location: ", data.Location);
						}
					  });
					// fs.writeFileSync(filePath, bufferData);
					database.query(`select * from admin where id = '${t}'`,(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								database.query(`insert into  brands(id,name,image,pinned) values('${generateUniqueId()}','${req.body.name}','${n}',false)`,(error,result)=>{
									if (error) return res.send({success: false, message: error})
									res.send({success:true, message: "brand created"})
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/addusedin',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								t = tokendata.token.id
								i = req.body.image[0] || 'tg'
								e = gfxt(i)
								n = `${generateUniqueId()}.${e}`
								const base64Data = i.replace(/^data:image\/\w+;base64,/, '');
								const bufferData = Buffer.from(base64Data, 'base64');
								const filePath = join(__dirname,'..','images', n);
								const params = {
									Bucket: 'itspacerwanda',
									Key: `images/${n}`,
									Body: bufferData
								  };
								  s3.upload(params, function(err, data) {
									if (err) {
									  console.log("Error uploading file: ", err);
									} else {
									  console.log("File uploaded successfully. Location: ", data.Location);
									}
								  });
								// fs.writeFileSync(filePath, bufferData);
								database.query(`insert into  usedin(id,name,image,pinned) values('${generateUniqueId()}','${req.body.name}','${n}',false)`,(error,result)=>{
									console.log(error)
									if (error) return res.send({success: false, message: error})
									res.send({success:true, message: "usability added"})
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/addsubcategory',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								i = req.body.image[0] || 'tg'
								e = gfxt(i)
								n = `${generateUniqueId()}.${e}`
								const base64Data = i.replace(/^data:image\/\w+;base64,/, '');
								const bufferData = Buffer.from(base64Data, 'base64');
								const filePath = join(__dirname,'..','images', n);
								const params = {
									Bucket: 'itspacerwanda',
									Key: `images/${n}`,
									Body: bufferData
								  };
								  s3.upload(params, function(err, data) {
									if (err) {
									  console.log("Error uploading file: ", err);
									} else {
									  console.log("File uploaded successfully. Location: ", data.Location);
									}
								  });
								// fs.writeFileSync(filePath, bufferData);
								database.query(`insert into subcategories(id,name,category,image,pinned) values('${generateUniqueId()}','${req.body.name}','${req.body.catid}','${n}',false)`,(error,result)=>{
									console.log(error)
									if (error) return res.send({success: false, message: error})
									res.send({success:true, message: "sub category created"})
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/addfamily',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					i = req.body.image[0] || 'tg'
					e = gfxt(i)
					n = `${generateUniqueId()}.${e}`
					const base64Data = i.replace(/^data:image\/\w+;base64,/, '');
					const bufferData = Buffer.from(base64Data, 'base64');
					const filePath = join(__dirname,'..','images', n);
					const params = {
						Bucket: 'itspacerwanda',
						Key: `images/${n}`,
						Body: bufferData
					  };
					  s3.upload(params, function(err, data) {
						if (err) {
						  console.log("Error uploading file: ", err);
						} else {
						  console.log("File uploaded successfully. Location: ", data.Location);
						}
					  });
					// fs.writeFileSync(filePath, bufferData);
					database.query(`select * from admin where id = '${t}'`,(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								database.query(`insert into families(id,name,brand,image,pinned) values('${generateUniqueId()}','${req.body.fname}','${req.body.brandname}','${n}',false)`,(error,result)=>{
									if (error) return res.send({success: false, message: error})
									res.send({success:true, message: "family created"})
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/deletecategory',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`, async(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								v = await query(`select image from categories where id = '${req.body.catid}'`)
								v = v[0].image
									try {
										const params = {
											Bucket: 'itspacerwanda',
											Key: `images/${v}`
										  };
										  
										  s3.deleteObject(params, function(err, data) {
											if (err) {
											  console.log('Error deleting file: ' + err);
											} else {
											  console.log('File deleted successfully');
											}
										  });
										// fs.unlink(`../images/${v}`, (err) => {
										// 	console.log('File deleted');
										//   });
									} catch (error) {
										console.log('file not found')
									}
								
								database.query(`delete from  categories where id = '${req.body.catid}'`,(error,result)=>{
									if (error) return res.send({success: false, message: "Oops an error occured"})
									if (result.affectedRows > 0) {
										res.send({success:true, message: "category deleted"})
									} else {
										res.send({success:false, message: "category not found"})
									}
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/deletebrand',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					
							
					database.query(`select * from admin where id = '${t}'`, async(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								v = await query(`select image from brands where id = '${req.body.brandid}'`)
								v = v[0].image
								try {
									const params = {
										Bucket: 'itspacerwanda',
										Key: `brands/${v}`
									  };
									  
									  s3.deleteObject(params, function(err, data) {
										if (err) {
										  console.log('Error deleting file: ' + err);
										} else {
										  console.log('File deleted successfully');
										}
									  });
									// fs.unlink(`../brands/${v}`, (err) => {
									// 	console.log('File deleted');
									// });
								} catch (error) {
									console.log('file not found')
								}
								database.query(`delete from  brands where id = '${req.body.brandid}'`,(error,result)=>{
									if (error) return res.send({success: false, message: "Oops an error occured"})
									if (result.affectedRows > 0) {
										res.send({success:true, message: "brand deleted"})
									} else {
										res.send({success:false, message: "brand not found"})
									}
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/deletefamily',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`, async(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								v = await query(`select image from families where id = '${req.body.famid}'`)
								v = v[0].image
								try {
									const params = {
										Bucket: 'itspacerwanda',
										Key: `images/${v}`
									  };
									  
									  s3.deleteObject(params, function(err, data) {
										if (err) {
										  console.log('Error deleting file: ' + err);
										} else {
										  console.log('File deleted successfully');
										}
									  });
									// fs.unlink(`../images/${v}`, (err) => {
									// 	console.log('File deleted');
									// });
								} catch (error) {
									console.log('file not found')
								}
								database.query(`delete from  families where id = '${req.body.famid}'`,(error,result)=>{
									if (error) return res.send({success: false, message: "Oops an error occured"})
									if (result.affectedRows > 0) {
										res.send({success:true, message: "family deleted"})
									} else {
										res.send({success:false, message: "family not found"})
									}
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/deletesubcategory',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,async (error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								v = await query(`select image from subcategories where id = '${req.body.subcatid}'`)
								v = v[0].image
								try {
									const params = {
										Bucket: 'itspacerwanda',
										Key: `images/${v}`
									  };
									  
									  s3.deleteObject(params, function(err, data) {
										if (err) {
										  console.log('Error deleting file: ' + err);
										} else {
										  console.log('File deleted successfully');
										}
									  });
									// fs.unlink(`../images/${v}`, (err) => {
									// 	console.log('File deleted');
									// });
								} catch (error) {
									console.log('file not found')
								}
								database.query(`delete from  subcategories where id = '${req.body.subcatid}'`,(error,result)=>{
									if (error) return res.send({success: false, message: "Oops an error occured"})
									if (result.affectedRows > 0) {
										res.send({success:true, message: "subcategory deleted"})
									} else {
										res.send({success:false, message: "subcategory not found"})
									}
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/deleteusedin',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,async (error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								v = await query(`select image from usedin where id = '${req.body.usedinid}'`)
								v = v[0].image
								try {
									const params = {
										Bucket: 'itspacerwanda',
										Key: `images/${v}`
									  };
									  
									  s3.deleteObject(params, function(err, data) {
										if (err) {
										  console.log('Error deleting file: ' + err);
										} else {
										  console.log('File deleted successfully');
										}
									  });
									// fs.unlink(`../images/${v}`, (err) => {
									// 	console.log('File deleted');
									// });
								} catch (error) {
									console.log('file not found')
								}
								database.query(`delete from  usedin where id = '${req.body.usedinid}'`,(error,result)=>{
									if (error) return res.send({success: false, message: "Oops an error occured"})
									if (result.affectedRows > 0) {
										res.send({success:true, message: "usability deleted"})
									} else {
										res.send({success:false, message: "usability not found"})
									}
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/deleteprod',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`, async(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								v = await query(`select images from products where id = '${req.body.prodid}'`)
								v = JSON.parse(v[0].images)
								for (const image of v) {
									try {
										const params = {
											Bucket: 'itspacerwanda',
											Key: `procuct-imgz/${image}`
										  };
										  
										  s3.deleteObject(params, function(err, data) {
											if (err) {
											  console.log('Error deleting file: ' + err);
											} else {
											  console.log('File deleted successfully');
											}
										  });
										// fs.unlink(`../product-imgz/${image}`, (err) => {
										// 	console.log('File deleted');
										//   });
									} catch (error) {
										console.log('file not found')
									}
								}
								database.query(`delete from products where id = '${req.body.prodid}'`,(err,results)=>{
									if (err) return res.send({success: false, message: err});
									if (results.affectedRows > 0) {
										res.send({success:true, message: "product deleted"})
									}else{
										res.send({success:false, message: "product not found"})
									}
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/addproduct',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,async (error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								c = req.body.conditions;
								c.forEach(condition=>{
									Object.assign(c[c.indexOf(condition)],{newprice: condition.price, promotion: null})
								})
								i = req.body.images
								a = []
								for (const image of i) {
									e = gfxt(image)
									let n
									
									try {
										const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
										const imageBuffer = Buffer.from(base64Data, 'base64');
										const watermarkImagePath = join(__dirname,'..','icons', 'favicon.png'),
										finalImageBuffer = await processImage(imageBuffer,watermarkImagePath)
										const fileType = await getMimeType(imageBuffer);
										n = `${generateUniqueId()}.${fileType.ext}`
										const params = {
												Bucket: 'itspacerwanda',
												Key: `product-imgz/${n}`,
												ContentType: fileType.mime,
												Body: finalImageBuffer,
											};
										s3.upload(params, function(err, data) {
											if (err) {
												console.log("Error uploading file: ", err);
											} else {
												console.log("File uploaded successfully. Location: ", data.Location);
											}
										});
									} catch (error) {
										console.error('Error:', error.message);	
									}
									a.push(n)
								}
								z = generateUniqueId();
								database.query(`insert into products(id,name,category,subcategory,usedin,brand,family,quantity,description,specifications,images,conditions,availability,orders,status,shipment_info) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[z,req.body.name,req.body.catid,req.body.subcatid,req.body.usedin,req.body.brandid,req.body.famid,req.body.quantity,req.body.description,JSON.stringify(req.body.specifications),JSON.stringify(a),JSON.stringify(c),req.body.availability,0,'active',JSON.stringify(req.body.dinfos)],(error,result)=>{
									if (error) {
										console.log(error)
										return res.status(500).send({success: false, message: 'internal server error'})
									}
									res.send({success:true, message: "product inserted successfully"})
								})
							} catch (error) {
								console.log(error)
								res.status(500).send({success: false, message: 'there was an error while processing your request'})
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.status(500).send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.status(500).send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/pin',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								let ty,id;
								ty=req.body.type
								id=req.body.id
								database.query(`update ${ty} set pinned = true where id = ?`,[id],(error,result)=>{
									if (error) return res.send({success: false, message: error})
									res.send({success:true, message: "pin added"})
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/unpin',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								let ty,id;
								ty=req.body.type
								id=req.body.id
								database.query(`update ${ty} set pinned = false where id = ?`,[id],(error,result)=>{
									if (error) return res.send({success: false, message: error})
									res.send({success:true, message: "pin removed"})
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/addavailability',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								database.query(`insert into availability(id,name,pinned) values('${generateUniqueId()}','${req.body.name}',false)`,(error,result)=>{
									console.log(error)
									if (error) return res.send({success: false, message: "Oops an error occured"})
									res.send({success:true, message: "availability added"})
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/deleteavailability',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								database.query(`delete from availability where id = '${req.body.avid}'`,(error,result)=>{
									console.log(error)
									if (error) return res.send({success: false, message: "Oops an error occured"})
									res.send({success:true, message: "availability deleted"})
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.get('/api/getpinned',async(req,res)=>{
		try {
			let r ={categories: null,subcategories: null, brands: null, families: null,usedin: null,availability: null}
			database.query(`select name from categories  where pinned = 1 order by dateadded asc`,(error,result)=>{
				if (error) return res.send({success: false, message: "Oops an error occured"})
				r.categories = result
				database.query(`select name from subcategories  where pinned = 1`,(error,results)=>{
					if (error) return res.send({success: false, message: "Oops an error occured"})
					r.subcategories = results
					r.categories = result
					database.query(`select name from brands  where pinned = 1`,(error,resultb)=>{
						if (error) return res.send({success: false, message: "Oops an error occured"})
						r.brands = resultb
						database.query(`select name from families  where pinned = 1`,(error,resultf)=>{
							if (error) return res.send({success: false, message: "Oops an error occured"})
							r.families = resultf
							database.query(`select name from usedin  where pinned = 1`,(error,resultp)=>{
								if (error) return res.send({success: false, message: "Oops an error occured"})
								r.usedin = resultp
								database.query(`select name from availability  where pinned = 1`,(error,resulta)=>{
									if (error) return res.send({success: false, message: "Oops an error occured"})
									r.availability = resulta
									res.send({success:true, message: r})
								})
							})
						})
					})
				})
			})		
			
		} catch (error) {
			res.send({success: false, message: 'oops an error occured'})
			
		}
			
	})
	router.get('/api/getdiscounted', async (req, res) => {
		try {
		  database.query(`SELECT products.id as prodid,JSON_EXTRACT(products.conditions, '$') AS conditions,products.availability,products.description,products.availability, products.name as pname, products.specifications as pspecs,products.images as pimgs, products.orders as porders, categories.name as catname,categories.id as catid, subcategories.name as subcatname,subcategories.id as subcatid, brands.name as brandname,brands.id as brandid,families.name as famname, families.id as famid, usedin.id as usedinid, usedin.name as usedinname FROM (((((products inner join brands on products.brand = brands.name)inner join families on products.family = families.name)inner join categories on products.category = categories.name)inner join subcategories on  products.subcategory = subcategories.name)inner join usedin on products.usedin = usedin.name) where JSON_CONTAINS(conditions, '{"promotion": true}', '$') `,(error,result)=>{
			if (error) return res.send({ success: false, message: error});
			const products = JSON.parse(JSON.stringify(result))
			products.forEach(prods=>{
				try {
					products[products.indexOf(prods)].conditions = JSON.parse(products[products.indexOf(prods)].conditions)
					products[products.indexOf(prods)].pspecs = JSON.parse(products[products.indexOf(prods)].pspecs)
					products[products.indexOf(prods)].pimgs = JSON.parse(products[products.indexOf(prods)].pimgs)
					
				} catch (error) {
					
				}
			})
			products.forEach(prod=>{
				prod.conditions.forEach(cond=>{
					if (cond.promotion == null) {
						products[products.indexOf(prod)].conditions.splice(prod.conditions.indexOf(cond),1)
					}
				})
			})
			res.send({ success: true, message: products});
		  });
		} catch (err) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});	
	router.post('/api/adddiscount',async (req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								c = req.body.condition;
								n = req.body.newprice;
								database.query(`UPDATE products
								SET conditions = JSON_SET(conditions, '$[${c}].newprice', ${n}, '$[${c}].promotion', true)
								WHERE id = '${req.body.product}'`,(error,result)=>{
									if (error) return res.send({success: false, message: error})
									if (result.affectedRows>0) {
										res.send({success:true, message: "promotion added successfully"});
									}else{
										res.send({success:false, message: "the promotion was not added"});
									}
								})
							} catch (err) {
								res.send({success: false, message: "oops an error occured"})
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/remdiscount',async (req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								c = req.body.condition;
								database.query(`UPDATE products
								SET conditions = JSON_SET(conditions, '$[${c}].newprice', JSON_EXTRACT(products.conditions, '$[${c}].price'), '$[${c}].promotion', null)
								WHERE id = '${req.body.product}'`,(error,result)=>{
									if (error) return res.send({success: false, message: error})
									if (result.affectedRows>0) {
										res.send({success:true, message: "promotion removed successfully"});
									}else{
										res.send({success:false, message: "the promotion was not removed"});
									}
								})
							} catch (err) {
								res.send({success: false, message: "oops an error occured"})
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/addorder',validatePayment,async (req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from users where id = '${t}' and status = 'active'`,async (error,result)=>{
						if (error) return res.send({success: false, message: error})
						if (result.length > 0) {
							try {
								let uinfo = result[0]
								p = req.body.products;
								c = {products: [],total: 0}
								for (const productinfo of p) {
									if (productinfo.qty > 0) {
										r = await getPrice(productinfo)
										if (r) {
											r = JSON.parse(r[0].conditions)
											r.forEach(conds=>{
												if (conds.name == productinfo.condition) {
													r = conds
												}
											})
											p = await query(`select quantity,orders from products where id = '${productinfo.prodid}'`)
											p = p[0]
											q = p.quantity
											n = p.orders
											v = await query(`update products set quantity = ${q} - ${productinfo.qty}, orders = ${n} + ${productinfo.qty} where id = '${productinfo.prodid}' and quantity >= ${productinfo.qty}`);
											if (v) {
												if (v.affectedRows > 0) {
													c.products.push({id: productinfo.prodid,condition: productinfo.condition, qty: productinfo.qty,pname: productinfo.pname,image: productinfo.image,unitprice: r.newprice, totalprice: r.newprice * parseInt(productinfo.qty)})
													c.total += (r.newprice * parseInt(productinfo.qty))
												}
											}
											
										}
									}
								}
								if (c.products.length > 0) {
									o = await query(`insert into orders(id,products,totalprice,uid,uaddress,status)values('${generateUniqueId()}','${JSON.stringify(c.products)}','${c.total}','${t}','${JSON.stringify(req.body.address)}','new')`);
								}
								if (o) {
									res.send({success:true,message: 'cheers!, your order has been successfully submitted our team will review it in no time'})
									const emailUserContent = `
									<html lang="en"><head>
									<meta charset="UTF-8">
									<meta name="viewport" content="width=device-width, initial-scale=1.0">
									<title>order placed</title>
									<style>
										/* Add your custom CSS styles here */
										body {
										font-family: Arial, sans-serif;
										margin: 0;
										padding: 0;
										background-color: #ffffff;
										}
										.container {
										max-width: 600px;
										margin: 0 auto;
										padding: 20px;
										background-color: #ffffff;
										box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
										}
										h1 {
										color: #333333;
										margin-top: 0;
										}
										p {
										color: #000;
										line-height: 1.5;
										}
										.footer {
										background-color: #f2f2f2;
										padding: 20px;
										box-sizing: border-box;
										width: 100%;
										position: fixed;
										bottom: 0px;
										text-align: center;
										}
									</style>
									</head>
									<body>
									<div class="container">
										<p style="text-align: center"> <img src="https://itspace.rw/icons/favicon.png" style="width: 300px;height: 152px,display:flex;justify-content:center;align-items:center;overflow-wrap:break-word"></p>
										<h1>Hi, ${uinfo.firstname} </h1>
										<p style="font-size:16px; text-transform: capitalize;">your order was placed successfully</p>
										<p style="font-size: 18px; font-weight: bold;">visit <a href="https://itspace.rw/user/?page=0">your user account</a> to view more order details</p>
									</div>
									<div class="footer">
										<p>&copy; ${new Date().getFullYear()} ITSPACE LTD. All rights reserved.</p>
									</div>
									
									</body></html>
									`,emailUserMessage = {subject: 'Order Placed Successully'}
									const emailAdminContent = `
										<!DOCTYPE html>
										<html lang="en">
										<head>
										<meta charset="UTF-8">
										<meta name="viewport" content="width=device-width, initial-scale=1.0">
										<title>order placed</title>
										<style>
											/* Add your custom CSS styles here */
											body {
											font-family: Arial, sans-serif;
											margin: 0;
											padding: 0;
											background-color: #ffffff;
											}
											.container {
											max-width: 600px;
											margin: 0 auto;
											padding: 20px;
											background-color: #ffffff;
											box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
											}
											h1 {
											color: #333333;
											margin-top: 0;
											}
											p {
											color: #000;
											line-height: 1.5;
											}
											.footer {
											background-color: #f2f2f2;
											padding: 20px;
											box-sizing: border-box;
											width: 100%;
											position: fixed;
											bottom: 0px;
											text-align: center;
											}
										</style>
										</head>
										<body>
										<div class="container">
										<p style="text-align: center"> <img src="https://itspace.rw/icons/favicon.png" style="width: 300px;height: 152px,display:flex;justify-content:center;align-items:center;overflow-wrap:break-word"></p>
											<h1>Hi, Admin </h1>
											<p style="font-size:16px; text-transform: capitalize;">a new order was placed by ${uinfo.firstname} ${uinfo.lastname}</p>
											<p style="font-size: 18px; font-weight: bold;">visit <a href="https://itspace.rw/admin/dashboard?page=new-orders">new orders page</a> to view more order details</p>
										</div>
										<div class="footer">
											<p>&copy; ${new Date().getFullYear()} ITSPACE LTD. All rights reserved.</p>
										</div>
										</body>
										</html>
									`,emailAdminMessage = {subject: 'incoming New Order'}
									sendmail('itspace250gmail.com',emailAdminMessage,emailAdminContent)
									sendmail(uinfo.email,emailUserMessage,emailUserContent)


								}else{
									res.status(500).send({success:false,message: 'Oops an error occured'});
								}
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
							}
								
						} else {
							res.send({success: false, message: "user not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.get('/api/tree',async(req,res)=>{
		d = req.body.email
		e = req.body.password
		try {
			c = await query('select id,name,pinned from categories order by name asc');
			for (const category of c) {	
				Object.assign(c[c.indexOf(category)],{subcategories: []})
				s = await query(`select id,name,pinned from subcategories where category='${category.id}' order by name asc`)
			
			if(!s) return res.send({success:false,message:'internal server error'})
				c[c.indexOf(category)].subcategories.push(s)
			}
			b = await query('select id,name,image,pinned from brands order by name asc');
			if(!b) return res.send({success:false,message:'internal server error'})
			try {
				for (const brand of b) {	
					Object.assign(b[b.indexOf(brand)],{series: []})
					s = await query(`select id,name,image,pinned from families where brand='${brand.id}' order by name asc`)
					if(!s) return res.send({success:false,message:'internal server error'})
					b[b.indexOf(brand)].series.push(s)
				}	
			} catch (error) {
				
			}
			
			a = await query('select id,name,pinned from availability order by name asc');
			if(!a) return res.send({success:false,message:'internal server error'})
			u = await query('select id,name,image from usedin order by name asc');
			if(!u) return res.send({success:false,message:'internal server error'})
			res.send({success:true,message:{categories: c,brands:b,usedin:u,availability:a}})
		} catch (error) {
			console.log(error)
		}
	})
	router.post('/api/getwishlist', async (req, res) => {
		try {
			authenticateToken(req.body.token, async (tokendata)=>{
				if (tokendata.success) {
					try {
						t = tokendata.token.id
						
						r = await query(`select * from users where id = '${t}' and status = 'active'`)
							if (!r) return res.status(500).send({success: false, message: 'oops an error occured'})
						if (r.length > 0) {
							h = await query(`select products from wishlist where uid = '${tokendata.token.id}'`)
							if (!h) return res.status(500).send({success: false, message: "internal server error"})
							
							if (h.length > 0) {
								h = JSON.parse(h[0].products)
								j = [];
								for(const prodid of h) {
									let pr = await query(`SELECT products.id as prodid,products.availability,	products.description, products.name as pname, products.specifications as pspecs,JSON_EXTRACT(products.conditions, '$') AS conditions,products.images as pimgs, products.orders as porders, categories.name as catname,categories.id as catid, subcategories.name as subcatname,subcategories.id as subcatid, brands.name as brandname,brands.id as brandid,families.name as famname, families.id as famid, usedin.id as usedinid, usedin.name as usedinname FROM (((((products inner join brands on products.brand = brands.name)inner join families on products.family = families.name)inner join categories on products.category = categories.name)inner join subcategories on  products.subcategory = subcategories.name)inner join usedin on products.usedin = usedin.name)  where products.id = '${prodid}'`)
									const products = JSON.parse(JSON.stringify(pr))
									products.forEach(prods=>{
										try {
											products[products.indexOf(prods)].conditions = JSON.parse(products[products.indexOf(prods)].conditions)
											products[products.indexOf(prods)].pspecs = JSON.parse(products[products.indexOf(prods)].pspecs)
											products[products.indexOf(prods)].pimgs = JSON.parse(products[products.indexOf(prods)].pimgs)
											
										} catch (error) {
											
										}
									})
									if(products.length > 0) j.push(products[0])
									if (!pr) return res.send({ success: false, message: "oops an error occured"});
								}
								res.send({ success: true, message: j});	
								
							}else{
								res.send({ success: true, message: []});
							}
								
						}else{
							res.status(403).send({ success: false, message: "authentication error"});
						}
					}catch(error){
						res.status(500).send({ success: false, message: 'Oops an error occured'});
					}
				}else{
					res.status(500).send({ success: false, message: tokendata.message});
				}
		  });
		} catch (error) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});
	router.post('/api/getneworders', async (req, res) => {
		try {
			authenticateToken(req.body.token, async (tokendata)=>{
				if (tokendata.success) {
					try {
						t = tokendata.token.id
						r = await query(`select * from admin where id = '${t}'`)
							if (!r) return res.status(500).send({success: false, message: 'oops an error occured'})
						if (r.length > 0) {
							h = await query(`select orders.products,orders.totalprice,orders.id,orders.uaddress,users.firstname,users.lastname from orders inner join users on orders.uid = users.id where orders.status = 'new'  order by orders.date desc`)
							if (!h) return res.status(500).send({success: false, message: "internal server error"})
							
							if (h.length > 0) {
								for (const order of h) {
									h[h.indexOf(order)].products = JSON.parse(order.products)
									h[h.indexOf(order)].uaddress = JSON.parse(order.uaddress)
								}
								j = [];
								res.send({ success: true, message: h});	
								
							}else{
								res.send({ success: true, message: []});
							}
								
						}else{
							res.status(403).send({ success: false, message: "authentication error"});
						}
					}catch(error){
						res.status(500).send({ success: false, message: error});
					}
				}else{
					res.status(500).send({ success: false, message: tokendata.message});
				}
		  });
		} catch (error) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});
	router.post('/api/getpendingorders', async (req, res) => {
		try {
			authenticateToken(req.body.token, async (tokendata)=>{
				if (tokendata.success) {
					try {
						t = tokendata.token.id
						r = await query(`select * from admin where id = '${t}'`)
							if (!r) return res.status(500).send({success: false, message: 'oops an error occured'})
						if (r.length > 0) {
							h = await query(`select orders.products,orders.totalprice,orders.id,orders.uaddress,users.firstname,users.lastname from orders inner join users on orders.uid = users.id where orders.status = 'pending'  order by orders.date desc`)
							if (!h) return res.status(500).send({success: false, message: "internal server error"})
							
							if (h.length > 0) {
								for (const order of h) {
									h[h.indexOf(order)].products = JSON.parse(order.products)
									h[h.indexOf(order)].uaddress = JSON.parse(order.uaddress)
								}
								j = [];
								res.send({ success: true, message: h});	
								
							}else{
								res.send({ success: true, message: []});
							}
								
						}else{
							res.status(403).send({ success: false, message: "authentication error"});
						}
					}catch(error){
						res.status(500).send({ success: false, message: error});
					}
				}else{
					res.status(500).send({ success: false, message: tokendata.message});
				}
		  });
		} catch (error) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});
	router.post('/api/getdeliveredorders', async (req, res) => {
		try {
			authenticateToken(req.body.token, async (tokendata)=>{
				if (tokendata.success) {
					try {
						t = tokendata.token.id
						r = await query(`select * from admin where id = '${t}'`)
							if (!r) return res.status(500).send({success: false, message: 'oops an error occured'})
						if (r.length > 0) {
							h = await query(`select orders.products,orders.totalprice,orders.id,orders.uaddress,users.firstname,users.lastname from orders inner join users on orders.uid = users.id where orders.status = 'delivered'  order by orders.date desc`)
							if (!h) return res.status(500).send({success: false, message: "internal server error"})
							
							if (h.length > 0) {
								for (const order of h) {
									h[h.indexOf(order)].products = JSON.parse(order.products)
									h[h.indexOf(order)].uaddress = JSON.parse(order.uaddress)
								}
								j = [];
								res.send({ success: true, message: h});	
								
							}else{
								res.send({ success: true, message: []});
							}
								
						}else{
							res.status(403).send({ success: false, message: "authentication error"});
						}
					}catch(error){
						res.status(500).send({ success: false, message: error});
					}
				}else{
					res.status(500).send({ success: false, message: tokendata.message});
				}
		  });
		} catch (error) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});
	router.post('/api/getorders', async (req, res) => {
		try {
			authenticateToken(req.body.token, async (tokendata)=>{
				if (tokendata.success) {
					try {
						t = tokendata.token.id
						r = await query(`select * from admin where id = '${t}'`)
							if (!r) return res.status(500).send({success: false, message: 'oops an error occured'})
						if (r.length > 0) {
							h = await query(`select orders.products,orders.totalprice,orders.id,orders.uaddress,users.firstname,users.lastname from orders inner join users on orders.uid = users.id order by orders.date desc`)
							if (!h) return res.status(500).send({success: false, message: "internal server error"})
							
							if (h.length > 0) {
								for (const order of h) {
									h[h.indexOf(order)].products = JSON.parse(order.products)
									h[h.indexOf(order)].uaddress = JSON.parse(order.uaddress)
								}
								j = [];
								res.send({ success: true, message: h});	
								
							}else{
								res.send({ success: true, message: []});
							}
								
						}else{
							res.status(403).send({ success: false, message: "authentication error"});
						}
					}catch(error){
						res.status(500).send({ success: false, message: error});
					}
				}else{
					res.status(500).send({ success: false, message: tokendata.message});
				}
		  });
		} catch (error) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});
	router.post('/api/myorders', async (req, res) => {
		try {
			authenticateToken(req.body.token, async (tokendata)=>{
				if (tokendata.success) {
					try {
						t = tokendata.token.id
						r = await query(`select * from users where id = '${t}' and status='active'`)
							if (!r) return res.status(500).send({success: false, message: 'oops an error occured'})
						if (r.length > 0) {
							h = await query(`select orders.products,orders.status,orders.totalprice,orders.id,orders.uaddress,users.firstname,users.lastname from orders inner join users on orders.uid = users.id where orders.uid = '${t}'  order by orders.date desc`)
							if (!h) return res.status(500).send({success: false, message: "internal server error"})
							
							if (h.length > 0) {
								for (const order of h) {
									h[h.indexOf(order)].products = JSON.parse(order.products)
									h[h.indexOf(order)].uaddress = JSON.parse(order.uaddress)
									for (const product of h[h.indexOf(order)].products) {
										i = h[h.indexOf(order)].products.indexOf(product);
										m = await query(`select images from products where id = '${product.id}'`)
										m = JSON.parse(m[0].images)
										m = m[0];
										h[h.indexOf(order)].products[i].image = m
									}
								}
								res.send({ success: true, message: h});	
								
							}else{
								res.send({ success: true, message: []});
							}
								
						}else{
							res.status(403).send({ success: false, message: "authentication error"});
						}
					}catch(error){
						res.status(500).send({ success: false, message: error});
					}
				}else{
					res.status(500).send({ success: false, message: tokendata.message});
				}
		  });
		} catch (error) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});
	router.post('/api/getorder', async (req, res) => {
		try {
			authenticateToken(req.body.token, async (tokendata)=>{
				if (tokendata.success) {
					try {
						
							i = req.body.orderid
							h = await query(`select orders.products,orders.date,orders.totalprice,orders.id,orders.uaddress,users.firstname,users.lastname from orders inner join users on orders.uid = users.id where orders.id = '${i}'`)
							if (!h) return res.status(500).send({success: false, message: "internal server error"})
							
							if (h.length > 0) {
								for (const order of h) {
									h[h.indexOf(order)].products = JSON.parse(order.products)
									h[h.indexOf(order)].uaddress = JSON.parse(order.uaddress)
								}
								j = [];
								res.send({ success: true, message: h});	
								
							}else{
								res.send({ success: false, message: []});
							}
					}catch(error){
						res.status(500).send({ success: false, message: 'internal server error'});
					}
				}else{
					res.status(500).send({ success: false, message: "internal server error"});
				}
		  });
		} catch (error) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});
	router.post('/api/chorst', async (req, res) => {
		try {
			authenticateToken(req.body.token, async (tokendata)=>{
				if (tokendata.success) {
					try {
						t = tokendata.token.id
						r = await query(`select * from admin where id = '${t}'`)
							if (!r) return res.status(500).send({success: false, message: 'oops an error occured'})
						if (r.length > 0) {
							i = req.body.orderid
							h = await query(`update orders set status = '${req.body.status}' where orders.id = '${i}'`)
							if (!h) return res.status(500).send({success: false, message: "internal server error"})
							res.status(200).send({success: true, message: "status changed"})
								
						}else{
							res.status(403).send({ success: false, message: "authentication error"});
						}
					}catch(error){
						res.status(500).send({ success: false, message: error});
					}
				}else{
					res.status(500).send({ success: false, message: tokendata.message});
				}
		  });
		} catch (error) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});
	router.post('/api/addquery', async(req,res)=>{
		f = req.body.firstname+" "+req.body.lastname
		e = req.body.email
		p = req.body.phonenumber
		s = req.body.subject
		m = req.body.message
		r = await query(`insert into queries(id,fullname,email,phone,subject,message,status)values('${generateUniqueId()}','${f}','${e}','${p}','${s}','${m}','new')`)
			if (!r) return res.status(500).send({ success: false, message: "internal server error" })
			res.send({ success: true, message: "Query sent successfully i will reply you as soon as possible" });
		
	})
	router.post('/api/getqueries', async (req, res) => {
		try {
			authenticateToken(req.body.token, async (tokendata)=>{
				if (tokendata.success) {
					try {
						t = tokendata.token.id
						r = await query(`select * from admin where id = '${t}'`)
							if (!r) return res.status(403).send({success: false, message: 'oops an error occured'})
						q = await query(`select * from queries`)
						if(!q) return res.status(404).send({success: false, message: q})
						res.status(200).send({success: true, message: q})
					}catch(error){
						res.status(500).send({ success: false, message: error});
					}
				}else{
					res.status(500).send({ success: false, message: tokendata.message});
				}
		  });
		} catch (error) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});
	router.post('/api/getnewqueries', async (req, res) => {
		try {
			authenticateToken(req.body.token, async (tokendata)=>{
				if (tokendata.success) {
					try {
						t = tokendata.token.id
						r = await query(`select * from admin where id = '${t}'`)
							if (!r) return res.status(403).send({success: false, message: 'oops an error occured'})
						q = await query(`select * from queries where status = 'new'`)
						if(!q) return res.status(404).send({success: false, message: q})
						res.status(200).send({success: true, message: q})
					}catch(error){
						res.status(500).send({ success: false, message: error});
					}
				}else{
					res.status(500).send({ success: false, message: tokendata.message});
				}
		  });
		} catch (error) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});
	router.post('/api/chquest', async (req, res) => {
		try {
			authenticateToken(req.body.token, async (tokendata)=>{
				if (tokendata.success) {
					try {
						t = tokendata.token.id
						r = await query(`select * from admin where id = '${t}'`)
							if (!r) return res.status(500).send({success: false, message: 'oops an error occured'})
						if (r.length > 0) {
							i = req.body.queryid
							h = await query(`update queries set status = '${req.body.status}' where id = '${i}'`)
							if (!h) return res.status(500).send({success: false, message: "internal server error"})
							res.status(200).send({success: true, message: "status changed"})
								
						}else{
							res.status(403).send({ success: false, message: "authentication error"});
						}
					}catch(error){
						res.status(500).send({ success: false, message: error});
					}
				}else{
					res.status(500).send({ success: false, message: tokendata.message});
				}
		  });
		} catch (error) {
		  res.send({ success: false, message: "oops an error occured" });
		}
	});
	router.post('/api/ftchnbrs',async (req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,async (error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								o = await query(`select COUNT(id) as orders from orders`);
								if (!o) return res.send({success: false, message: 'internal server error'})
								let newo = await query(`select COUNT(id) as neworders from orders where status = 'new'`);
								if (!newo) return res.send({success: false, message: 'internal server error'})
								let devo = await query(`select COUNT(id) as deliveredorders from orders where status = 'delivered'`);
								if (!devo) return res.send({success: false, message: 'internal server error'})
								q = await query(`select COUNT(id) as queries from queries`)
								if (!q) return res.send({success: false, message: 'internal server error'})
								let nq = await query(`select COUNT(id) as newqueries from queries where status = 'new'`)
								if (!nq) return res.send({success: false, message: 'internal server error'})
								u = await query(`select COUNT(id) as users from users`)
								if (!u) return res.send({success: false, message: 'internal server error'})
								p = await query(`select COUNT(id) as products from products`)
								if (!u) return res.send({success: false, message: 'internal server error'})
								let response = [newo[0],devo[0],q[0],nq[0],u[0],o[0],p[0]]
								res.send({success: true,message: response})
								
							} catch (err) {
								res.send({success: false, message: "oops an error occured"})
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/deleteuser',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								database.query(`delete from  users where id = '${req.body.userid}'`,(error,result)=>{
									if (error) return res.send({success: false, message: "Oops an error occured"})
									if (result.affectedRows > 0) {
										res.send({success:true, message: "user deleted"})
									} else {
										res.send({success:false, message: "user not found"})
									}
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/ban',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,async (error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								u = await query(`select status from users where id = '${req.body.userid}'`)
								if (!u) return res.status(500).send({success: false, message: 'oops an error occured'})
								if (!u.length) return res.status(404).send({success: false, message: 'user not found'})
								s = u[0].status
								if (s == 'active') {
									b = await query(`update users set status = 'banned' where id = '${req.body.userid}'`)
									return res.status(200).send({success: true, message: 'user banned successfully'})
								} else {
									b = await query(`update users set status = 'active' where id = '${req.body.userid}'`)
									return res.status(200).send({success: true, message: 'user un-banned successfully'})
								}
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/edituser',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from users where id = '${t}' and status='active'`,async (error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								p = await query(`select password from users where id = '${t}' and status = 'active'`)
								if (!p) return res.status(500).send({success: false, message: 'oops an error occured'})
								if (!p.length) return res.status(404).send({success: false, message: 'user not found'})
								passwordMatch = (p[0].password == req.body.password)
								if (!passwordMatch)  return res.status(403).send({success: false, message: 'incorrect password'})
								s = req.body.reqtype
								if (s == 'names') {
									b = await query(`update users set firstname = '${req.body.firstname}' ,lastname = '${req.body.lastname}' where id = '${t}'`)
									if (!b) return res.status(500).send({success: false, message: 'internal server error'})
									return res.status(200).send({success: true, message: 'names changed successfully'})
								} else if(s == 'password'){
									b = await query(`update users set password = '${req.body.newpassword}' where id = '${t}'`)
									if (!b) return res.status(500).send({success: false, message: 'internal server error'})
									return res.status(200).send({success: true, message: 'password changed successfully'})
								}else if(s == 'phone'){
									p = await CheckPhoneAvai(req.body.value)
									if (u) {
										return res.status(403).send({success: true, message: 'the provided phone number is already in use'})
									}
									b = await query(`update users set phone = '${req.body.value}' where id = '${t}'`)
									if (!b) return res.status(500).send({success: false, message: 'internal server error'})
									return res.status(200).send({success: true, message: 'phone number changed successfully'})
								}
								else if(s == 'email'){
									u = await CheckEmailAvai(req.body.value)
									if (u) {
										return res.status(403).send({success: true, message: 'the provided email is already in use'})
									}
									b = await query(`update users set email = '${req.body.value}' where id = '${t}'`)
									if (!b) return res.status(500).send({success: false, message: 'internal server error'})
									return res.status(200).send({success: true, message: 'email changed successfully'})
								}else if(s == 'password'){
									b = await query(`update users set password = '${req.body.value}' where id = '${t}'`)
									if (!b) return res.status(500).send({success: false, message: 'internal server error'})
									return res.status(200).send({success: true, message: 'password changed successfully'})
								}else{
									return res.status(403).send({success: true, message: 'access denied, you are not allowed to perform this action'})
								}
							} catch (error) {
								console.log(error)
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "user not found"})
						}
					})
				} catch (error) {
					console.log(error)
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/add-address',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from users where id = '${t}' and status='active'`,async (error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								p = await query(`select password from users where id = '${t}' and status = 'active'`)
								if (!p) return res.status(500).send({success: false, message: 'oops an error occured'})
								if (!p.length) return res.status(404).send({success: false, message: 'user not found'})
								let {address} = req.body
									b = await query(`update users set addresses = '${JSON.stringify(address)}' where id = '${t}'`)
									if (!b) return res.status(500).send({success: false, message: 'internal server error'})
									return res.status(200).send({success: true, message: 'address recorded successfully'})
							} catch (error) {
								console.log(error)
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "user not found"})
						}
					})
				} catch (error) {
					console.log(error)
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/addfeedback',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from users where id = '${t}' and status='active'`,async (error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								u = t
								m = req.body.message
								p = req.body.product
								r = req.body.rating
								i = req.body.image[0]
								if (i) {
									e = gfxt(i)
									n = `${generateUniqueId()}.${e}`
									const base64Data = i.replace(/^data:image\/\w+;base64,/, '');
									const bufferData = Buffer.from(base64Data, 'base64');
									const filePath = join(__dirname,'..','feedback-imgz', n);
									const params = {
										Bucket: 'itspacerwanda',
										Key: `feedback-imgz/${n}`,
										Body: bufferData
									  };
									  s3.upload(params, function(err, data) {
										if (err) {
										  console.log("Error uploading file: ", err);
										} else {
										  console.log("File uploaded successfully. Location: ", data.Location);
										}
									  });
									// fs.writeFileSync(filePath, bufferData);
								}else{
									n = null
								}
								q = await query(`insert into feedbacks(id,user,product,rate,image,message) values ('${generateUniqueId()}','${u}','${p}',${r},'${n}','${m}')`)
								if (!q) return res.send({success: false, message: 'oops an error occured'})
								res.send({success: true, message: 'feedback sent successfully'})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "user not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.post('/api/deletefeedback',async(req,res)=>{
		authenticateToken(req.body.token,async (tokendata)=>{
			if (tokendata.success) {
				try {
					t = tokendata.token.id
					database.query(`select * from admin where id = '${t}'`,(error,result)=>{
						if (error) return res.send({success: false, message: 'oops an error occured'})
						if (result.length > 0) {
							try {
								database.query(`delete from feedbacks where id = '${req.body.feedbackid}'`,(err,results)=>{
									if (err) return res.send({success: false, message: "Oops an error occured"});
									if (results.affectedRows > 0) {
										res.send({success:true, message: "feedback deleted"})
									}else{
										res.send({success:false, message: "feedback not found"})
									}
								})
							} catch (error) {
								res.send({success: false, message: 'oops an error occured'})
								
							}
						} else {
							res.send({success: false, message: "admin not found"})
						}
					})
				} catch (error) {
					res.send({success: false, message: 'oops an error occured'})
					
				}
			}else{
				res.send({success: false, message: 'oops an error occured'})
			}
		})
	})
	router.get('/auth/google' , passport.authenticate('google', { scope: 
		[ 'email', 'profile' ] 
	})); 
	router.get('/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/' }),
	async (req, res) => {
	  // Successful login
	  let user = await CheckEmailAvai(req.user.email),t,id
	  if (user){
		t = addToken(user)
	  }else{
		id = generateUniqueId();
		user = await query(`insert into users (id,firstname,lastname,email,password,addresses) values ('${id}','${req.user.given_name}','${req.user.family_name}','${req.user.email}','${id}','[]')`)
		t = addToken({id,status:"active",firstname:req.user.given_name, lastname: req.user.family_name,email: req.user.email});
	  }
	  const token = t
	  if(!token) res.status(500).send("There was an error while processing the payment");
	  res.send(`<script>window.opener.postMessage({ type: 'google-auth', token: '${token}' }, '*'); window.close();</script>`);
	}
  );
	router.post('/api/webhook', json({type: 'application/json'}), (req, res) => {
		const event = req.body
		const secretHash = process.env.FLW_WEBHOOK_SECRET; // Set this in Flutterwave dashboard
		const signature = req.headers["verif-hash"];

		if (!signature || signature !== secretHash) {
			return res.status(401).send("Unauthorized");
		}
		myEmitter.emit('PaymentCallback',{success: true,event});
			
	});
	router.get('/js/*',(req, res) => assets(req, res, 'js'));
	router.get('/images/*',(req, res) => assets(req, res, 'images'));
	router.get('/slider-imgz/*',(req, res) => assets(req, res, 'slider-imgz'));
	router.get('/team-imgz/*',(req, res) => assets(req, res, 'team-imgz'));
	router.get('/icons/*',(req, res) => assets(req, res, 'icons'));
	router.get('/css/*',(req, res) => assets(req, res, 'css'));
	router.get('/', (req, res) => page(req, res, 'admin'));
	router.get('/:user/:filename*?', (req, res) => page(req, res, 'admin'));
			
				 
//========================================= FUNCTIONS ==========================================
async function validatePayment(req, res, next) {
    const recipientSocket = Array.from(io.sockets.sockets.values()).find(
        (sock) => sock.handshake.query.id === req.headers["ss-id"]
    );

    if (!recipientSocket) {
        return res.status(400).send({ success: false, message: "Socket connection not found" });
    }

    try {
        const { products, token, payment, address } = req.body;
        let uinfo;

        if (!token) {
            return res.status(401).send({ success: false, message: "Unauthorized" });
        } else if (authenticateToken2(token).success) {
            uinfo = authenticateToken2(token).token;
        }

        let totalAmount = 0;
        for (const productinfo of products) {
            let productData = await getPrice(productinfo);
            if (productData) {
                let conditions = JSON.parse(productData[0].conditions);
                let conditionData = conditions.find((c) => c.name === productinfo.condition);
                if (conditionData) {
                    totalAmount += conditionData.newprice * parseInt(productinfo.qty);
                }
            }
        }

        const REFID = await createREFID();
        const payload = {
            tx_ref: `tx-${Date.now()}`,
            order_id: REFID,
            amount: totalAmount,
            currency: "RWF",
            email: uinfo.email,
            phone_number: payment.data.payphonenumber,
            fullname: `${uinfo.firstname} ${uinfo.lastname}`
        };

        if (payment.method === "mobile-money-form") {
            const response = await flw.MobileMoney.rwanda(payload);

            if (response.meta?.authorization?.mode === "redirect") {
                recipientSocket.emit("confirmPayment", { redirURL: response.meta.authorization.redirect });
                let transactionStatus = await waitForChargeSuccess(payload.tx_ref);
                if (transactionStatus) {
					recipientSocket.emit("PaymentCompleted", true);
                    next();
                } else {
                    return res.status(400).send({ success: false, message: "Payment failed" });
                }
            } else {
                return res.status(400).send({ success: false, message: "Payment failed" });
            }
        } else {
            const cardPayload = {
                card_number: payment.data.cardnumber,
                cvv: payment.data.cvv,
                expiry_month: payment.data.expdate.split("/")[0].trim(),
                expiry_year: payment.data.expdate.split("/")[1].trim(),
                currency: "RWF",
                amount: totalAmount,
                redirect_url: process.env.SERVER_ORIGIN,
                fullname: `${uinfo.firstname} ${uinfo.lastname}`,
                email: uinfo.email,
                phone_number: uinfo.phone,
                enckey: process.env.FLW_ENCRYPTION_KEY,
                tx_ref: `tx-${Date.now()}`
            };

            const response = await flw.Charge.card(cardPayload);
			recipientSocket.emit('processingPayment',true)
            if (!response.meta) {
                return res.status(500).send({ success: false, message: response.message });
            }
            if (response.meta.authorization.mode === "pin") {
                let pinPayload = { ...cardPayload, authorization: { mode: "pin", pin: "3310" } };
                const reCallCharge = await flw.Charge.card(pinPayload);
                if (reCallCharge.status === "error") {
                    return res.status(500).send({ message: reCallCharge.message });
                }
				if (reCallCharge.status === 'success' && reCallCharge.data.flw_ref) {
					let verifyT = await waitForChargeSuccess(reCallCharge.data.tx_ref);
					recipientSocket.emit("PaymentCompleted", false);
					return next()
				} else {
					return res.status(400).json({ success: false, message: "OTP validation not required" });
				}
            }
            if (response.meta.authorization.mode === "avs_noauth") {
                let avsPayload = {
                    ...cardPayload,
                    authorization: {
                        mode: "avs_noauth",
                        city: address.address.split(",")[1],
                        address: "69 Fremont Street",
                        state: address.address.split(",")[0],
                        country: "RW",
                        zipcode: address.zipcode
                    }
                };
                const reCallCharge = await flw.Charge.card(avsPayload);
	
				if (reCallCharge.status === 'success' && reCallCharge.data.flw_ref) {
					let verifyT = await waitForChargeSuccess(reCallCharge.data.tx_ref);
					if(verifyT){
						recipientSocket.emit("PaymentCompleted", false);
						return next()
					}else{
						return res.status(400).json({ success: false, message: "Error While processing payments" });

					}
				} else {
					return res.status(400).json({ success: false, message: "Error While processing payments on AVS_NOAUTH" });
				}
            }
            if (response.meta.authorization.mode === "redirect") {
                recipientSocket.emit("confirmPayment", {redirURL: response.meta.authorization.redirect});
                let decision = await waitForChargeSuccess(response.data.tx_ref);
				if (decision) {
					recipientSocket.emit("PaymentCompleted", true);
					return next();
				}else{
					recipientSocket.emit("PaymentCompleted", false);
					return res.status(400).send({ success: false, message: "Payment failed" });
				}
            }

            return res.status(400).send({ success: false, message: "Payment failed" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("There was an error while processing the payment");
    }
}

async function getPrice(productinfo) {
	try {
		const res = await new Promise((resolve, reject) => {
		database.query(`SELECT JSON_EXTRACT(conditions, '$') AS conditions from products where id = '${productinfo.prodid}' and JSON_CONTAINS(conditions, '{"name": "${productinfo.condition}"}', '$')`, (err, res) => {
			if (err) reject(err);
			resolve(res);
		});
		});
		return JSON.parse(JSON.stringify(res));
	} catch (error) {
		console.error(error);
	}
}
function gnrtctn(obj) {
	let s = 'where'
	obj.forEach(table=>{
		if (Object.keys(table)[0] == 'serie') {
			let f = table
			table = {family : table.serie}
			obj[obj.indexOf(f)] = table
		}
		if (obj.indexOf(table) == (obj.length-1)) {
			if (Object.keys(table) == 'category' || Object.keys(table) == 'subcategory' || Object.keys(table) == 'brand' || Object.keys(table) == 'family' || Object.keys(table) == 'idnot' || Object.keys(table) == 'usedin' || Object.keys(table) == 'order-by' || Object.keys(table) == 'range' || Object.keys(table) == 'availability' || Object.keys(table) == 'namelike') {
				if (Object.keys(table) == 'namelike') {
					s+= ` products.name like '%${table[Object.keys(table)]}%'`	
				}else if (Object.keys(table) == 'idnot') {
					s+= ` products.id != '${table[Object.keys(table)]}'`
				}else if (Object.keys(table) == 'order-by') {
					if (s == 'where') {
						s = ''
					}else{
						s = s.substring(0, s.length - 3)
					}
					if(table[Object.keys(table)] == 'name-asc'){
						s+= ` order by products.name asc`
					}else if(table[Object.keys(table)] == 'name-desc'){
						s+= ` order by products.name desc`
					}else if(table[Object.keys(table)] == 'price-asc'){
						s+= ` order by JSON_EXTRACT(products.conditions, '$[0].newprice') asc`
					}else if(table[Object.keys(table)] == 'price-desc'){
						s+= ` order by JSON_EXTRACT(products.conditions, '$[0].newprice') desc`
					}

				}else if(Object.keys(table) == 'range'){
					s+= ` JSON_EXTRACT(products.conditions, '$[0].newprice') BETWEEN ${table[Object.keys(table)][0]} AND ${table[Object.keys(table)][1]}`
				}else{
					s+= ` products.${Object.keys(table)} = '${table[Object.keys(table)]}'`
				}
			}
		} else {
			if (Object.keys(table) == 'category' || Object.keys(table) == 'subcategory' || Object.keys(table) == 'brand' || Object.keys(table) == 'family' || Object.keys(table) == 'idnot' || Object.keys(table) == 'usedin' || Object.keys(table) == 'range' || Object.keys(table) == 'availability') {
				if(Object.keys(table) == 'range'){
					s+= ` JSON_EXTRACT(products.conditions, '$[0].newprice') BETWEEN ${table[Object.keys(table)][0]} AND ${table[Object.keys(table)][1]} and`
				
				}else{
					s+= ` products.${Object.keys(table)} = '${table[Object.keys(table)]}' and`
				}
			}
		}
	})
	if (s == 'where') s = ''
	return s
}
function gnrtorctn(obj) {
	let s = 'where'
	obj.forEach(table=>{
		if (Object.keys(table)[0] == 'serie') {
			let f = table
			table = {family : table.serie}
			obj[obj.indexOf(f)] = table
		}
		if (obj.indexOf(table) == (obj.length-1)) {
			if (Object.keys(table) == 'category' || Object.keys(table) == 'subcategory' || Object.keys(table) == 'brand' || Object.keys(table) == 'family' || Object.keys(table) == 'idnot' || Object.keys(table) == 'usedin' || Object.keys(table) == 'order-by' || Object.keys(table) == 'range') {
				if (Object.keys(table) == 'idnot') {
				s+= ` products.id != '${table[Object.keys(table)]}'`
				}else if (Object.keys(table) == 'order-by') {
					if (s == 'where') {
						s = ''
					}else{
						s = s.substring(0, s.length - 3)
					}
					if(table[Object.keys(table)] == 'name-asc'){
						s+= ` order by products.name asc`
					}else if(table[Object.keys(table)] == 'name-desc'){
						s+= ` order by products.name desc`
					}else if(table[Object.keys(table)] == 'price-asc'){
						s+= ` order by products.name asc`
					}else if(table[Object.keys(table)] == 'price-desc'){
						s+= ` order by products.name asc`
					}

				}else if(Object.keys(table) == 'range'){
					s+= ` JSON_EXTRACT(products.conditions, '$[0].newprice') BETWEEN ${table[Object.keys(table)][0]} AND ${table[Object.keys(table)][1]}`
				}else{
					s+= ` products.${Object.keys(table)} = '${table[Object.keys(table)]}'`
				}
			}
		} else {
			if (Object.keys(table) == 'category' || Object.keys(table) == 'subcategory' || Object.keys(table) == 'brand' || Object.keys(table) == 'family' || Object.keys(table) == 'idnot' || Object.keys(table) == 'usedin' || Object.keys(table) == 'range' || Object.keys(table) == 'availability') {
				if(Object.keys(table) == 'range'){
					s = s.substring(0, s.length - 2)
					s+= 'and'
					s+= ` JSON_EXTRACT(products.conditions, '$[0].newprice') BETWEEN ${table[Object.keys(table)][0]} AND ${table[Object.keys(table)][1]} or`
				}else{
					s+= ` products.${Object.keys(table)} = '${table[Object.keys(table)]}' or`
				}
			}
		}
	})
	if (s == 'where') s = ''
	return s
}
function checkemail(req, res, callback) {
const string =  req.body.email;
	database.query(`select * from users where email = '${string}'`, (error, result) => {
	if (error) return res.send({success:false, message: error});
	let response;
	if (result.length > 0) {
		response = {success: true, content: "email found"};
	} else {
		response = {success: false, content: "email is not available"};
	}

	callback(response);
	});
	
}
async function CheckEmailAvai(email){
	let response = await query(`select id,firstname,lastname,email,status from users where email = '${email}'`);
	if (!response) {
		return undefined
	}
	if (response.length) {
		return response[0]
	}else{
		return false
	}
}
async function CheckPhoneAvai(phone){
	let response = await query(`select id,firstname,lastname,email,status from users where phone = '${phone}'`);
	if (!response) {
		return undefined
	}
	if (response.length) {
		return response[0]
	}else{
		return false
	}
}
function authenticateToken(token,callback){
	jwt.verify(token, secretkey, (err, decoded) => {
		let response;
		if (err) {
		response = {success: false, message: err.message};
		} else {
		response = {success : true,token: decoded};
		}
		callback(response);
	});
}
function authenticateToken2(data) {
	const v = jwt.verify(data, secretkey, (err, decoded) => {
		let response;
		if (err) {
		  response = { success: false, message: errorMessage.is_error };
		  console.log(err)
		} else {
		  response = { success: true, token: decoded };
		}
		return response;
	  });
	  return v;
}
function addToken(userInfo) {
	try {
		console.log(userInfo)
		const token = jwt.sign(userInfo, secretkey);
		return token;
	} catch (error) {
		console.log(error)
		return null
	}
	
}
const generateUniqueId = () => {
	return randomBytes(9).toString('hex');
};
async function query(query) {
	try {
		const res = await new Promise((resolve, reject) => {
		database.query(query, (err, res) => {
			if (err) reject(err);
			resolve(res);
		});
		});
		return JSON.parse(JSON.stringify(res));
	} catch (error) {
		console.error(error);
	}
}
function gfxt(data) {
	const mime = data.split(',')[0].match(/:(.*?);/)[1];
	const extension = mime.split('/')[1].split('+')[0];
	return extension;
}
function rs(string){
	string = string.replace(/\s+/g, '-')
	return string
}

const postschema = {
    method: "POST",
    body: null,
    headers: {
	  "content-type": "application/json",
	  'accept': '*/*',
	  'Ocp-Apim-Subscription-Key' : MTN_COLL_SK,
	  'Authorization' : null

    }
}
const getschema =  {
    method: "GET",
    headers: {
      "content-type": "application/json",
      'accept': '*/*',
	  'Ocp-Apim-Subscription-Key' : MTN_COLL_SK,
	  'Authorization' : null

    }
};
(async ()=>{
	let ref =  await createPayment({orderid : 12,amount: 6500, phonenumber : '250790861884'})
	let pi = await getPaymentInfo(ref)
	if (pi.status == 'SUCCESSFUL') {
	let drefid = await disbursement(6000);
	if (drefid) {
		let disinfo = await getDisbursementInfo(drefid),balance = await checkBalance()
		console.log(disinfo,balance)
	}
	}
})
async function createREFID() {
	let gs = getschema
	try {
		let response = await fetch(`https://www.uuidgenerator.net/api/version4`,gs)
		const data = await response.text();
		return data
	} catch (error) {
		console.log(error)
		return null
	}
}
async function getPaymentInfo(REFID) {
	// let gs = getschema,at = await createAccessToken()
	// if(!at) return null
	// Object.assign(gs.headers,{Authorization: `Bearer ${at}`,'X-Target-Environment' : MTN_ENV})
	// try {
	// 	let response = await fetch(`${MTN_API_LINK}/collection/v1_0/requesttopay/${REFID}`,gs)
	// 	if (response.status == 200) {
	// 		const data = await response.json();
	// 		return data
	// 	}else {
	// 		return null
	// 	}
	// } catch (error) {
	// 	console.log(error)
	// 	return null
	// }
	return REFID

}
async function disbursement(amount){
	let ps = postschema,at = await createAccessToken(),rid = await createREFID(),
	v = {
		method: "POST",
		body: JSON.stringify({
			"amount": amount,
			"currency": "EUR",
			"externalId": "999999898",
			"payee": {
			  "partyIdType": "MSISDN",
			  "partyId": "0790861884"
			},
			"payerMessage": "incoming payment",
			"payeeNote": "demo text"
		  }),
		headers: {
		  "content-type": "application/json",
		  'accept': '*/*',
		  Authorization: `Bearer ${at}`,
			'X-reference-Id' : rid,
			'X-Target-Environment' : MTN_ENV,
			'Ocp-Apim-Subscription-Key' : MTN_DISB_SK
	
		}
	};
	if(!rid || !at) return null
	try {
		let response = await fetch(`${MTN_API_LINK}/disbursement/v1_0/transfer`,v)
		if (response.status == 202) {
			return rid
		}else {
			return null
		}
	} catch (error) {
		console.log(error)
		return null
	}
}
async function getDisbursementInfo(REFID) {
	let gs = getschema,at = await createAccessToken()
	if(!at) return null
	let v = {
		method: "GET",
		headers: {
		  "content-type": "application/json",
		  'accept': '*/*',
		  'Authorization': `Bearer ${at}`,
		  'X-Target-Environment' : MTN_ENV,
		  'Ocp-Apim-Subscription-Key' : MTN_DISB_SK
		}
	}
	try {
		let response = await fetch(`${MTN_API_LINK}/disbursement/v1_0/transfer/${REFID}`,v)
		if (response.status == 200) {
			const data = await response.json();
			return data
		}else {
			return null
		}
	} catch (error) {
		console.log(error)
		return null
	}

}
async function checkBalance() {
	let gs = getschema,at = await createAccessToken()
	if(!at) return null
	Object.assign(gs.headers,{Authorization: `Bearer ${at}`,'X-Target-Environment' : MTN_ENV})
	try {
		let response = await fetch(`${MTN_API_LINK}/collection/v1_0/account/balance`,gs)
		if (response.status == 200) {
			const data = await response.json();
			return data
		}else {
			return null
		}
	} catch (error) {
		console.log(error)
		return null
	}

}
async function createAccessToken() {
	let ps = postschema
	Object.assign(ps.headers, {Authorization: MTN_AU})
	try {
		let response = await fetch(`${MTN_API_LINK}/collection/token/`,ps)
		if (response.status == 200) {
			const data = await response.json();
			return data.access_token
		}else{
			return null
		}
	} catch (error) {
		console.log(error)
		return null
	}
}
async function createPayment(info){
	let ps = postschema,at = await createAccessToken(),rid = await createREFID();
	if(!rid || !at) return null
	Object.assign(ps.headers, 
		{
			Authorization: `Bearer ${at}`,
			'X-reference-Id' : rid,
			'X-Target-Environment' : MTN_ENV
		})
		ps.body = JSON.stringify({
			"amount": info.amount,
			"currency": "EUR",
			"externalId": info.orderid,
			"payer": {
			  "partyIdType": "MSISDN",
			  "partyId": info.phonenumber
			},
			"payerMessage": "payment to itspace.rw",
			"payeeNote": "pay please"
		  })
	try {
		let response = await fetch(`${MTN_API_LINK}/collection/v1_0/requesttopay`,ps)
		if (response.status == 202) {
			return rid
		}else {
			return null
		}
	} catch (error) {
		console.log(error)
		return null
	}
}
async function waitForChargeSuccess(txref){
	return new Promise((resolve,reject) =>{
		myEmitter.on('PaymentCallback', (data)=>{
			console.log(data)
			if (data.event.data.tx_ref == txref) {
				if (data.event.event == 'charge.completed') {
					resolve(data.event.data)
				}else{
					resolve(0)
				}
			}
		})
	})
}
async function processImage(imageBuffer, watermarkPath) {
    try {
        const watermark = await sharp(watermarkPath)
            .resize(120, 60)
            .toBuffer();

        const processedImage = await sharp(imageBuffer)
            .composite([{ input: watermark, gravity: 'southeast' }])
            .toBuffer();

        return processedImage
    } catch (error) {
        console.error('Error processing image:', error);
		throw error
    }
}
async function getMimeType(buffer) {
	const fileType = await import('file-type');
	const type = await fileType.fileTypeFromBuffer(buffer);
    if (type) {
        return type;
    } else {
        console.log('Could not determine file type.');
        return null;
    }
}
const _router = router;
export { _router as router };