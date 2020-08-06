using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;

namespace Zin.Services.Models
{
    public class Result
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public IEnumerable<string> Errors { get; set; }
        public string Code { get; internal set; }

        public Result()
        {

        }

        public Result(IdentityResult identityResult)
        {
            Status = identityResult.Succeeded;
            Errors = identityResult.Errors.Select(x => x.Description);
            Code = (identityResult.Succeeded ? ResponseCode.Message : ResponseCode.Errors).ToString();
        }

        public Result(bool status, string message)
        {
            Status = status;
            Message = message;
            Code = (status ? ResponseCode.Message : ResponseCode.Error).ToString();
        }
    }

    public class Result<T> : Result where T : class
    {
        public T Data { get; set; }

        public Result(T data, bool status = true)
        {
            Status = status;
            Data = data;
            Code = ResponseCode.Data.ToString();
        }

        public Result(bool status, string message)
        {
            Status = status;
            Message = message;
            Code = ResponseCode.Message.ToString();
        }
    }

    internal enum ResponseCode
    {
        Message,
        Error,
        Errors,
        Data
    }
}
