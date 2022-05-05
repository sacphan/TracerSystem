using System;
using System.Collections.Generic;
using System.Text;

namespace TracerCafe.Data.Model
{
    public class Error
    {
        public static readonly ErrorObject SUCCESS = new ErrorObject { Code = 0, Message = "Success." };
        public static readonly ErrorObject FAILED = new ErrorObject { Code = 1, Message = "Failed." };

        public static ErrorObject Get(ErrorObject ErrorObj, object Data = null)
        {
            return new ErrorObject(ErrorObj, Data);
        }

        public static ErrorObject Success()
        {
            return new ErrorObject(SUCCESS);
        }

    }


    public class ErrorObject
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
        public ErrorObject(int Code, string Message, object Data = null)
        {
            this.Code = Code;
            this.Message = Message;
            this.Data = Data;
        }

        public ErrorObject()
        {
            Code = 0;
            Message = "Success";
        }

        public ErrorObject(ErrorObject Obj)
        {
            this.Code = Obj.Code;
            this.Message = Obj.Message;
            this.Data = Obj.Data;
        }

        public ErrorObject(ErrorObject Obj, object Data)
        {
            this.Code = Obj.Code;
            this.Message = Obj.Message;
            this.Data = Data;
        }

        public ErrorObject SetCode(ErrorObject Obj)
        {
            this.Code = Obj.Code;
            this.Message = Obj.Message;
            return this;
        }

        public ErrorObject SetCode(ErrorObject Obj, object Data)
        {
            SetCode(Obj).Data = Data;
            return this;
        }

        public ErrorObject SetMessage(string Message)
        {
            this.Message = Message;
            return this;
        }

        public ErrorObject SetData(object Data)
        {
            this.Data = Data;
            return this;
        }

        public object GetData()
        {
            return this.Data;
        }

        public ErrorObject Success(object Data)
        {
            return SetCode(Error.SUCCESS, Data);
        }

        public ErrorObject Failed(object Data)
        {
            return SetCode(Error.FAILED, Data);
        }

        public ErrorObject Failed(string Message)
        {
            return SetCode(Error.FAILED).SetMessage(Message);
        }


        public T GetData<T>()
        {
            return (T)Data;

        }
    }

}
