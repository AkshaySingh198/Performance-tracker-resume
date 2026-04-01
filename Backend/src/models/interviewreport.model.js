const mongoose=require('mongoose')


/**
 * -job description 
 * -resume text
 * -self description
 * -matchScore:number
 * 
 * -technical question :
 * [{
 * question:''
 * intention:""
 * answer:""
 * }]
 *
 *
 *           
 * -skill gap
 * [{
 * skill:""
 * severity:{
 * low :enum
 * medium :enum
 * high:enum
 * }
 * }]
 * 
 * -behavioral question:
 * [{
 * question:''
 * intention:""
 * answer:""
 * }]
 * 
 * -prep_plan:[{}] -days wise 
 */
const technicalQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    intention:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }

},{
    _id:false
})

const behavioralQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    intention:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }

},{
    _id:false
})

const skillGapSchema= new mongoose.Schema({
    skill:{
        type:String,
        required:true
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:true
    }
},{
    _id:false
})

const prepSchema= new mongoose.Schema({
    day:{
        type:Number,
        required:true
    },
    focus:{
        type:[String],
        required:true
    },
    tasks:{
        type:[String],
        required:true
    }
},{
    _id:false
})

const interviewReportSchema= new mongoose.Schema({
    jobDescription:{
        type:String,
        require:true,

    },
    resume:{
        type:String,
        
    },
    selfDescription:{
        type:String,
        required:true
    },
    matchScore:{
        type:Number,
        min:0,
        max:100

    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    prep:[prepSchema],
    skillGap:[skillGapSchema],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    },
    title:{
        type:String,
        required:false
    }
 
},{
    timestamps:true
})

const interviewReportModel=mongoose.model('InterviewSchema',interviewReportSchema)

module.exports=interviewReportModel;