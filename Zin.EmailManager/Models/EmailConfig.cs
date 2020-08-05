namespace Zin.EmailManager.Models
{
    public class EmailConfig
    {
        /// <summary>
        /// Sendgrid api key
        /// </summary>
        public string Apikey { get; set; }
        /// <summary>
        /// Reply to email
        /// </summary>
        public string From { get; set; }
        /// <summary>
        /// Display name in email
        /// </summary>
        public string DisplayName { get; set; }
    }
}
