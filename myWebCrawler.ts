import axios from "axios";
import * as cheerio from 'cheerio';
import Mail from "nodemailer/lib/mailer";

export class MyWebCrawler
{
	private linkHtmlElement: string | undefined | null;
	private mailer: Mail;
	private email: string;
	private url: string;

	public constructor(transporter: Mail, email: string, url: string)
	{
		this.email = email;
		this.mailer = transporter;
		this.url = url;
		this.search();
	}

	public async search()
	{
		console.log("start searching ...");

		console.log("Time: ", new Date(Date.now()).toLocaleString());

		const response = await axios.get(this.url);

		const $ = cheerio.load(response.data);
		
		this.linkHtmlElement = $('a:contains(Kontaktformular)').parent().html();
		// this.linkHtmlElement = $('a:contains(Krisennetzwerk Unterfranken)').parent().html();
		
		console.log("Content of ankertag: ", this.linkHtmlElement ?? "not found");

		this.linkHtmlElement != null;
		
		console.log("Link is avaiable: ", this.linkHtmlElement != null ? "yes" : "no");

		if(this.linkHtmlElement != null)
		{
			await this.mailer.sendMail({
				from: this.email,
				to: this.email,
				subject: "Formular ist verfügbar",
				html: this.linkHtmlElement,
			});
			console.log("Mail wurde versendet");
		}
		this.mailer
		console.log("")
	}

}
