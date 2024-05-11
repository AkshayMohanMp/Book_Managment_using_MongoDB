const express = require("express");

const {books} =require("../data/books.json");
const {users} =require("../data/users.json");


const router = express.Router();



const {userModel, BookModel} = require("../model");
const { getAllBooks, getSingleBookById, addNewBook, updateBookById } = require("../controller/book-controller");



/*
*route:/books
*method:GET
*description: Get all books
*access: Public
*parameter: None
*/ 
router.get("/",getAllBooks);
// router.get("/",(req, res)=>{
//     res.status(200).json({
//         success: true,
//         data:books
//     })
// })



/*
*route:/books/:id
*method:GET
*description: Get Single Users by ID
*access: Public
*parameter: ID
*/ 
router.get("/:id",getSingleBookById);
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


/*
*route:/books
*method:POST
*description: Adding a new book
*access: Public
*parameter: no
*/ 
router.post("/", addNewBook);



/*
*route:/books/:id
*method:PUT
*description: Updating book by ID
*access: Public
*parameter: ID
*/ 
router.put("/:id", updateBookById);


/*
*route:/books/:id
*method:DELETE
*description: Delete a  book by id
*access: Public
*parameter: ID
*/ 
router.delete("/:id",(req,res)=>{
    const {id}= req.params;
   
    const book = books.find((each)=> each.id ===id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "User with the sameid exist"
        })
    }
    const index = books.indexOf(book);
    books.splice(index,1);
    return res.status(200).json({
        success: true,
        data: books
    })
})


/*
*route:/books/issued
*method:GET
*description: Get all Issued books
*access: Public
*parameter: none
*/ 

router.get("/issued/by-user", (req, res)=>{
    const userWithIssuedBooks = users.find((each)=>{
        if(each.issuedBook){
            return each;}   
    })
    const issuedBooks =[];


    userWithIssuedBooks.for((each)=>{
        const book = books.find((book)=> book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    })
    if(issuedBooks.length===0){
        return res.status(404).json({
            success: false,
            message: "No Books Issued"
        })
    }

    return res.status(200).json({
        success: true,
        data: issuedBooks
    })
})


module.exports = router;