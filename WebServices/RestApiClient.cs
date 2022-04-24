using logintestserver.Models;
using System;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace logintestserver.WebServices
{
    public class RestApiClient
    {
        private const string LoginMethod = "urn:ICUTech.Intf-IICUTech#Login";

        private readonly string _baseAddress;

        public RestApiClient(string baseAddress)
        {
            _baseAddress = baseAddress;
        }

        public async Task<UserModel> LoginAsync(string userName, string password)
        {
            var soapRequest = $"<?xml version=\"1.0\" encoding=\"utf-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:tns=\"http://tempuri.org/\" xmlns:types=\"http://tempuri.org/encodedTypes\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><soap:Body soap:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"><q1:Login xmlns:q1=\"urn:ICUTech.Intf-IICUTech\"><UserName xsi:type=\"xsd:string\">{userName}</UserName><Password xsi:type=\"xsd:string\">{password}</Password></q1:Login></soap:Body></soap:Envelope>";
            var response = await CallPostAsync(LoginMethod, soapRequest);

            return ParseResponse<UserModel>(response);
        }

        private async Task<string> CallPostAsync(string method, string soapRequest)
        {
            using (var client = new HttpClient())
            {
                Initialize(client, method);

                using (var response = await client.PostAsync(string.Empty, new StringContent(soapRequest)))
                {
                    EnsureSuccessStatusCode("POST", method, response);
                    return await response.Content.ReadAsStringAsync();
                }
            }
        }

        private static void EnsureSuccessStatusCode(string action, string method, HttpResponseMessage response)
        {
            if (response.IsSuccessStatusCode)
            {
                return;
            }

            var message = $"Request '{action}: {method}' failed with code: {response.StatusCode}";
            throw new InvalidOperationException(message);
        }

        private static T ParseResponse<T>(string response)
            where T : class
        {
            var doc = XDocument.Parse(response);
            var result = doc.Descendants("return").FirstOrDefault();
            if (result == null)
                throw new InvalidOperationException("User not found");

            var jsonContent = result.Value;
            if (jsonContent.Contains("ResultCode"))
            {
                var error = JsonSerializer.Deserialize<ErrorModel>(jsonContent);
                throw new InvalidOperationException(error.ResultMessage);
            }

            return JsonSerializer.Deserialize<T>(jsonContent);
        }

        private void Initialize(HttpClient client, string method = null)
        {
            client.BaseAddress = new Uri(_baseAddress);
            client.DefaultRequestHeaders.Add("SOAPAction", "urn:ICUTech.Intf-IICUTech#Login");
        }
    }
}
