import "dotenv/config";
import fetch from "node-fetch";

const fetchAllUsers = async () => {
	const url =`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable`;

	console.log("リクエストURL:", url);

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"apiKey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			"Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
			"Content-Type": "application/json",
		}
	});

	if (!response.ok) {
		throw new Error(`HTTPエラー！ステータス: ${response.status}`);
	}

	const data = await response.json();
	console.log("取得したユーザー一覧:", data);
};

fetchAllUsers();



const fetchSelectedColumns = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?select=id,name`, {
		method: "GET",
		headers: {
			"apiKey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			"Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
			"Content-Type": "application/json",
		}
	});

	const data = await response.json();
	console.log("取得したカラムのみ:", data);
};

fetchSelectedColumns();

const fetchUserByName = async (username) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?name=eq.${encodeURIComponent(username)}`, {
		method: "GET",
		headers: {
			"apiKey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			"Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
			"Content-Type": "application/json",
		}
	});

	const data = await response.json();
	console.log(`ユーザー名 「${username}」のデータ:`, data);
};

fetchUserByName("田中太郎");



const fetchSortedUsers = async (order = "desc") => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?order=id.${order}`, {
		method: "GET",
		headers: {	
			"apiKey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			"Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
			"Content-Type": "application/json",
		}
	});

	const data = await response.json();
	console.log(`作成日時降順 (${order}) のユーザー一覧:`, data);
};

fetchSortedUsers("desc");




