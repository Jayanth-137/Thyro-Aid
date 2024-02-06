const { model } = require("mongoose");
const pred_model = require("../models/prediction-model");
const { execFile } = require("child_process");

const predictForm = async (req, res) => {
    try {
        const predictData = req.body;
        delete predictData.Name;

        const exePath = "./deployment_g63/deployment_g63.exe";
        const pyProcess = execFile(exePath,[JSON.stringify(predictData)]);
        
        let result = "";
        let err="";

        pyProcess.stdout.on('data',(data)=>{
            result+=data.toString();
        });
        
        pyProcess.stderr.on('data',(data)=>{
            err+=data.toString();
        });
        
        pyProcess.on('close',(code)=>{
            if(code==0){
                console.log({result: JSON.parse(result)});
                res.status(200).json({result: JSON.parse(result)});
            }else{
                console.log(err);
            }
        });


    } catch (error) {
        console.log("Error in predict route",error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
};

module.exports = { predictForm };