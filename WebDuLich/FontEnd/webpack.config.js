const path = require('path');
const webpack = require('webpack'); //Khai báo đối tượng webpack
var libs=[
    'jquery',
    'bootstrap',
    'popper.js'
]

module.exports = {
    plugins:[
        //plugin giúp nhận dạng cú pháp jquery
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            CKEDITOR: 'ckeditor',
            'window.CKEDITOR': 'ckeditor'
        }),
       
    ], 
    entry: {   
    
      Login:"./asset/ts/login.ts",
      Register:"./asset/ts/register.ts",
      Hotels:"./asset/ts/hotels.ts",
      Tours:"./asset/ts/tours.ts",
      Home:"./asset/ts/home.ts",
      Blog:"./asset/ts/blog.ts",
      DetailHotel:"./asset/ts/detailHotel.ts",
      DetailTour:"./asset/ts/detailTour.ts",
      BlogDetail:"./asset/ts/blogDetail.ts",
      TourSearch:"./asset/ts/tourSearch.ts",
      TourSearchDay:"./asset/ts/tourSearchDay.ts",
      HotelSearchType:"./asset/ts/hotelSearchType.ts",
      Cart:"./asset/ts/cart.ts",
      Contact:"./asset/ts/contact.ts",
      Account:"./asset/ts/account.ts",
      TourUser:"./asset/ts/tourUser.ts",
      HotelUser:"./asset/ts/hotelUser.ts",
      Admin:"./asset/ts/admin.ts",
      vendor:libs 
    },
    output: { 
        path: path.resolve(__dirname, "dist"), 
        filename: "[name].js", 
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            //Đóng gói css
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" },
                {
                    loader: "css-loader",
                    options: {
                        minimize: true,
                    }
                }],
            }
            //Đóng gói sass
            , {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true,
                        }
                    },
                    { loader: "sass-loader" },
                ]
            },
           

            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 100000,
                       
                        name: "../[path][name].[ext]",
                       
                    }
                }]
            },
            
        ]
    }, resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    
    optimization: {
        splitChunks: { 
            cacheGroups: {		
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    minSize: 50000,
                    name: "vendor",
                    enforce: true,
                }
            }
        }
    }
}