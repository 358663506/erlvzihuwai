import { reactive } from "vue";

export function useBrowser(app?: any) {
	const browser = reactive<any>({
		isMini: false,
		screen: "full"
	});

	function resize() {
		const w = document.body.clientWidth;

		if (w < 768) {
			browser.screen = "xs";
		} else if (w < 992) {
			browser.screen = "sm";
		} else if (w < 1200) {
			browser.screen = "md";
		} else if (w < 1920) {
			browser.screen = "xl";
		} else {
			browser.screen = "full";
		}

		browser.isMini = browser.screen === "xs";
	}

	if (app) {
		window.addEventListener("resize", resize);
		app.provide("browser", browser);
	}

	resize();

	return browser;
}
