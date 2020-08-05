using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Zin
{
    public class ControllerApi : ControllerBase
    {
        internal ObjectResult Created()
        {
            ObjectResult objectResult = new ObjectResult(null);
            objectResult.StatusCode = (int)HttpStatusCode.Created;
            return objectResult;
        }
    }
}
