('use strict');

const stripe = require('stripe')(process.env.STRIPE_KEY);

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        const { products } = ctx.request.body;

        // custom products info 
        const lineItems = await Promise.all(
            products.map(async (product) => {
                const singleProduct = await strapi
                    .service('api::product.product')
                    .findOne(product.id);

                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: singleProduct.title,
                        },
                        unit_amount: Math.round(singleProduct.price * 100)
                    },
                    quantity: product.quantity
                }
            })
        );

        try {
            const session = await stripe.checkout.sessions.create({
                line_items: lineItems,
                mode: 'payment',
                success_url: `${process.env.CLIENT_URL}?success=true`,
                cancel_url: `${process.env.CLIENT_URL}?success=false`,
                shipping_address_collection: {allowed_countries: ["US", "CA", "BD"]},
                payment_method_types: ["card"],
            });

            await strapi.service('api::order.order').create({
                data: {
                    products,
                    strapiId: session.id
                }
            });

            return {stripeSession: session};

        } catch (err) {
            ctx.response.status = 500;
            return err;
        }
    }
}));
