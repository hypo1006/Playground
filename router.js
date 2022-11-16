const express = require('express');
const router = express.Router();

// 여기에 라우터 작성
router.post('/getBoardList',(req,res)=>{
   
    Favorite.find({sort:{createdAt:-1}})
    .exec((err,boards)=>{ 
        if(err) return response.status(400).send(arr)
        return response.status(200).json({success: true, boards})
    })
    
});


router.post('/getBoardDetail',(req,res)=>{
   
    Favorite.find({postId: req.body.postId})
    .exec((err,board)=>{ 
        if(err) return response.status(400).send(arr)
        return response.status(200).json({success: true, board})
    })
    

});

router.post('/update',(req,res)=>{
    Board.update(
        {postId: req.body.postId},
        {$set:{
            writer: req.body.writer,
            title : req.body.title,
            content : req.body.content
        }})
        .exec((err,doc)=>{
            if(err) return response.status(400).send(err);
            else response.status(200).json({success: true, doc :doc}); 
        });
    
});

router.post('/remove',(request,response)=>{ 
    Board.findOneAndDelete({postId: request.body.postId ,writer : request.body.writer}) // 이 두 조건에 해당하는 db모델 지우기. 
    .exec((err,doc)=>{
         if(err) return response.status(400).send(err);
         else response.status(200).json({success: true, doc :doc}); 
    })
 })

module.exports = router;    //라우터를 메인 소스코드에서 활용할 수 있게 export