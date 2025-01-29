import cron from 'node-cron';
import nodemailer from "nodemailer";
import { MyWebCrawler } from './myWebCrawler';
import PromptSync from 'prompt-sync';



export function main()
{
	console.clear();

	const prompt = PromptSync();
	
	const email = prompt('Please insert your Email: ');

	console.log("\n");

	const password = prompt.hide('Please insert your Email Password: ');

	console.log("\n");

	const url = prompt('Please insert the url which you want to crawl: ');

	console.clear();

	console.log("create Mail Transporter");

	console.log("\n");

	const transporter = nodemailer.createTransport({
		host: "mail.gmx.net",
		port: 587,
		secure: false, // true for port 465, false for other ports
		auth: { user: email, pass: password },
	});

	console.log("initialize MyWebCrawler");

	console.log("\n");

	const myWebCrawler = new MyWebCrawler(transporter, email, url);

	cron.schedule('* * * * * * ', () => myWebCrawler.search());
};
