namespace Zin.EmailManager.Models
{
    class Email
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public object Tags { get; set; }
        public string TemplateName { get; set; }
    }
}
