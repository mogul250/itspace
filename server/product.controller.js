import { query } from "./query.controller.js";

async function getProdInfo(product){
    let p = await query(`SELECT products.id as prodid,COUNT(feedbacks.id) as fb_count, COALESCE(AVG(feedbacks.rate),0) as fb_rate, products.quantity,products.availability,products.description, products.name as pname, products.specifications as pspecs,JSON_EXTRACT(products.conditions, '$') AS conditions,products.images as pimgs, products.orders as porders, categories.name as catname, subcategories.name as subcatname, brands.name as brandname,families.name as famname, usedin.name as usedinname FROM ((((((products inner join brands on products.brand = brands.name)inner join families on products.family = families.name)inner join categories on products.category = categories.name)inner join subcategories on  products.subcategory = subcategories.name)inner join usedin on products.usedin = usedin.name)left join feedbacks on products.id = feedbacks.product)  where products.id = '${product}'`);
    if (p && p.length) {
        try {
            const product = JSON.parse(JSON.stringify(p))[0]
            product.conditions = JSON.parse(product.conditions)
            product.pspecs = JSON.parse(product.pspecs)
            product.pimgs = JSON.parse(product.pimgs)
            return product
            
        } catch (error) {
            return undefined
        }
    }
}
const _getProdInfo = getProdInfo;
export { _getProdInfo as getProdInfo };