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

	setInterval(() => {
		const random = 60 * (Math.floor(Math.random() * 30)) * 1000;
		console.log(`Waiting ${(random / 1000 / 60) + (60 * 30 * 1000 / 60 / 1000)} minutes for the next request`);
		setTimeout(() => {
			myWebCrawler.search();
		}, random);
	}, 60 * 30 * 1000);

};
