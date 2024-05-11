const {UserModel, BookModel} = require("../model");

    // router.get("/",(req, res)=>{
    //     res.status(200).json({
    //         success: true,
    //         data:books
    //     })
    // })
exports.getAllBooks = async(req, res) => {
    const books = await BookModel.find();

    if(books.lenth ===0)
        return res.status(404).json({
        success: false,
        message: "No Book Found"
    });
    return res.status(200).json({
        success: true,
        data: books
    })

}


// router.get("/:id",(req, res)=>{
//     const {id} =req.params;
//     const book = books.find((each)=> each.id ===id);
//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: "book not Found for the givven ID"
//         })
//     }
//     return res.status(200).json({
//         sucess:true,
//         data: book
//     })
// })

exports.getSingleBookById = async(req, res)=>{
    const {id} =req.params;
    // const book = books.find((each)=> each.id ===id);
    const book = await BookModel.findById(id)
    if(!book){
        return res.status(404).json({
            success: false,
            message: "book not Found for the givven ID"
        })
    }
    return res.status(200).json({
        sucess:true,
        data: book
    })
}


// router.post("/", (req, res)=>{
//     const{id, name, author, genre, price, publisher} =req.body;

//     const book = books.find((each)=> each.id ===id);
//     if(book){
//         return res.status(404).json({
//             success: false,
//             message: "Book with the same id exist"
//         })
//     }
//     books.push(
//         {id, name, author, genre, price, publisher }
//     )
//     return res.status(201).json({
//         success: true,
//         data: books
//     })
// })

exports.addNewBook = async(req, res)=>{
    const {data} =req.body;

    if(!data)
        return res.status(404).json({
            success: false,
            message: "No data Provided"
        })

    // const book = books.find((each)=> each.id ===id);
    await BookModel.create(data)
    const allBooks = await BookModel.find()
    // if(book){
    //     return res.status(404).json({
    //         success: false,
    //         message: "Book with the same id exist"
    //     })
    // }
    // books.push(
    //     {data }
    // )
    // const allBooks = [...books, data]
    return res.status(201).json({
        success: true,
        data: allBooks
    })  
}

// router.put("/:id", (req,res)=>{
//     const {id}= req.params;
//     const {data} = req.body;
//     const book = books.find((each)=> each.id ===id);
//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: "Books not found exist"
//         })
//     }
//     const updateBook = books.map((each)=>{
//         if(each.id===id){
//             return{
//                 ...each,
//                 ...data
//             }
//         }
//         return each;
//     })
//     return res.status(202).json({
//         success: true,
//         data: updateBook
//     })
// })



exports.updateBookById = async(req,res)=>{
    const {id}= req.params;
    const {data} = req.body;
    // const book = books.find((each)=> each.id ===id);
    // if(!book){
    //     return res.status(404).json({
    //         success: false,
    //         message: "Books not found exist"
    //     })
    // }
    // const updateBook = books.map((each)=>{
    //     if(each.id===id){
    //         return{
    //             ...each,
    //             ...data
    //         }
    //     }
    //     return each;
    // })

    const updateBook = await BookModel.findByIdAndUpdate({
        _id: id,
    }, data,{new: true})

    return res.status(202).json({
        success: true,
        data: updateBook
    })
}
// module.export = {getAllBooks, getSingleBookById}

