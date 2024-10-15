const User = require("../model/user.model")
const Comment = require("../model/comment.model")

exports.signupController = async (req,res)=>{
    try{
        const{name,email,password}= req.body;
        const existUser = await User.findOne({email:email});

        if(existUser){
            return res.status(202).json({
                success:false,
                message:"User already exists please go to loginpage"
            })
        }

        const newUser = await User.create({name,email,password});
        return res.status(200).json({
            success:true,
            message:"User created successfully",
            newUser,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message:"database Error",
            error: error.message
        })
    }
}


//login controller
exports.loginController = async (req,res)=>{
    try{
            const{email,password} = req.body;
            const existUser = await User.findOne({email:email}).populate("comments").exec();
            if(!existUser){
                return res.status(404).json({
                    success:false,
                    message:"User not found please go to loginpage"
                })
            }

           if(password === existUser.password){
            return res.status(200).json({
                success:true,
                message:"user login successfully",
                existUser,
            })
           }

           else{
            return res.status(404).json({
                success:false,
                message:"Wrong password try again"
            })
           }
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message:"database Error",
            error: error.message
        })
    }
}

//COMMENT CONTROLLER
exports.commentController = async (req,res)=>{
    try{
        const id= req.params.id;
        const{comment}= req.body;
       

        const newComment =await Comment.create({user:id,comment});
        


        const updatedPost= await User.findByIdAndUpdate(id, {$push: {comments:newComment._id}},{new:true})
        .populate("comments")  // populate the comments array with comments documents
        .exec();


        res.status(200).json({
            success: true,
            data:updatedPost,
            commentPost:newComment,
            message: "comment inserted into the DB successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message:"database Error",
            error: error.message
        })
    }
}


exports.allComments = async (req,res)=>{
    try{
        const allCommentsis = await Comment.find().populate("user").exec();

        return res.status(200).json({
            success: true,
            comments: allCommentsis,
            message:"all comments are here"
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message:"database Error",
            error: error.message
        })
    }
}