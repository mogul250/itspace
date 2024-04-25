import { readFile } from "fs";
// import  render  from "./page.scraper.controller";
import { join } from "path";
import { getProdInfo } from "./product.controller";
import { load } from 'cheerio';
import { verify } from 'jsonwebtoken';
import { query } from "./query.controller";
async function page (req,res,page){
	const { filename,user } = req.params;
    let file
    if (user == '/' || !user) {
        file = join(__dirname,'..', 'index.html')
    }
    else if (user == 'admin') {
        if (!filename) {
            file = join(__dirname,'..',user, 'index.html')
            
        }else if (filename && filename != 'dashboard') {
           return assets(req, res,'admin/js')
        }else{
            file = join(__dirname,'..',user, 'dashboard.html') 
        }
    }else if (user == 'user') {
        if (!filename) {
            file = join(__dirname,'..',user, 'index.html')
            
        }else if (filename && filename != 'dashboard') {
           return assets(req, res,'user/js')
        }else{
            file = join(__dirname,'..',user, 'dashboard.html') 
        }
    }else if (user == 'reset-password') {
      if (!filename) {
        res.status(403).send('invalid link');
        return;
          
      }else{
        let info = authenticateToken(filename)
        if (!info.success) return res.status(403).send('invalid link');
        info = info.token
        info = await query(`select email from users where id = '${info.id}' and fa2 = '${info.fa}'`)
        if (!info || !info.length) {
          return res.status(403).send('link expired');
        }
        file = join(__dirname,'..',user, 'index.html') 
      }
    }else {
        file = join(__dirname,'..',user, 'index.html')
    }
    readFile(file, async (err, data) => {
        if (err) {
            file = join(__dirname,'..','pages', '404.html') 
            readFile(file, (err, errorPageData) => {
                if (err) {
                  res.status(404).send('File Not Found');
                  return;
                }
        
                res.writeHead(404, {
                  'Content-Type': 'text/html',
                  'Content-Length': errorPageData.length,
                  // 'Cache-Control': 'public'

                });
                res.end(errorPageData);
            })
            return 0;
        }

        res.writeHead(200, {
            'Content-Type': "text/html",
            'Content-Length': data.length,
            // 'Cache-Control': 'public'
        });
        if (user == 'product') {
            let prodinfo = await getProdInfo(filename)
            if (!prodinfo ) {
            res.end('product not found');
            return 
            }
            const $ = load(data);
            const metaNameTag = $('meta[name="title"]'),
            metaImageTag = $('meta[name="image"]'),
            metaPriceTag = $('meta[name="price"]'),
            metaDescriptionTag = $('meta[name="description"]'),
            title = $('title'),
            metaURLTag = $('meta[name="url"]'),
            metaRatingTag = $('meta[name="rating"]'),
            metaRatingTotalTag = $('meta[name="total_r"]')
            metaRatingTag.attr('content',prodinfo.fb_rate)
            metaRatingTotalTag.attr('content',prodinfo.fb_count)
            metaURLTag.attr('content', 'https://itspace.rw/product/'+filename)
            title.text(prodinfo.pname),
            metaNameTag.attr('content', prodinfo.pname);
            metaImageTag.attr('content', 'https://itspace.rw/api/product-imgz/'+prodinfo.pimgs[0]);
            metaPriceTag.attr('content', prodinfo.conditions[0].price);
            metaDescriptionTag.attr('content', prodinfo.description)
            res.end($.html());
        }else{
            res.end(data);
        }
    });
}
function adcm(n) {
    try {
      n= Array.from(n.toString()).reverse()
      let s = "";
      let i = 0;
      for(const t of n ){
        if(i % 3 == 0 && i!= 0){
          s+=`p${t}`
        }else{
          s+=t
        }
        i++
      }
      s= Array.from(s).reverse().toString().replace(/,/gi,"")
      s=s.replace(/p/gi,",")
      return (s)
      
    } catch (error) {
      return n
    }
  }
let assets = (req, res,dir) => {
    const  filename  = req.params[0];
    let ext = filename.substring((filename.lastIndexOf('.')+1))
      let header
      switch (ext) {
        case 'js':
          header = 'text/javascript'
          break;
        case 'css':
          header = 'text/css'
          break;
        case 'svg':
          header = 'image/svg+xml'
          break;
        case 'png':
          header = 'image/png'
          break;
        case 'jpg':
          header = 'image/jpg'
          break;
        case 'webp':
          header = 'image/webp'
          break;
        default:
          header = 'text/html'
          break;
      }
    const file = join(__dirname, '..', dir, filename);
    readFile(file, (err, data) => {
      if (err) {
        res.status(404).send('File not Found');
        // console.log(err)
        return
      }
      
      const contentLength = data.length;
      res.writeHead(200, {
        'Content-Type': header,
        'Content-Length': contentLength,
        // 'Cache-Control': 'public, max-age=604800'
      });
      res.end(data);
    });
  };
  function authenticateToken(data) {
    const v = verify(data, 'myguy', (err, decoded) => {
      let response;
      if (err) {
        response = { success: false, message: 'internal server error' };
        console.log(err)
      } else {
        response = { success: true, token: decoded };
      }
      return response;
    });
    return v;
  }
const _page = page;
export { _page as page };
const _assets = assets;
export { _assets as assets };
