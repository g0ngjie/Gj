const iUp = (() => {
	let t = 0,
		d = 150,
		clean = () => (t = 0),
		up = e => {
			setTimeout(() => {
				$(e).addClass("up");
			}, t);
			t += d;
		},
		down = e => $(e).removeClass("up"),
		toggle = e => {
			setTimeout(() => {
				$(e).toggleClass("up");
			}, t);
			t += d;
		};
	return {
		clean: clean,
		up: up,
		down: down,
		toggle: toggle
	};
})();

$(document).ready(function () {
	// 获取一言数据
	$.get("https://v1.hitokoto.cn").then(e => {
		$("#description").html(
			e.hitokoto + "<br/> -「<strong>" + e.from + "</strong>」"
		);
	});

	const Enum = {
		INDEX: 1,
		IMG_LIST: 2
	},
		MAX_INDEX = 7;

	//Bing壁纸
	function getBingImgs(start = 0, limit = 8) {
		return new Promise(resolve => {
			const BING_URL =
				"https://bird.ioliu.cn/v1/?url=https://www.bing.com/HPImageArchive.aspx?format=js&idx=" +
				start +
				"&n=" +
				limit;
			const BASE_URL = "https://www.bing.com";
			let imgList = [];
			$.get(BING_URL, ({ images }) => {
				imgList = images.map(data => BASE_URL + data.url);
				resolve(imgList);
			});
		});
	}

	function random(max, min = 0) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getSession(key) {
		const jsonStr = sessionStorage.getItem(key);
		if (jsonStr) return JSON.parse(jsonStr);
		else return null;
	}

	function setSession(key, json) {
		const strJson = JSON.stringify(json);
		sessionStorage.setItem(key, strJson);
	}

	function clearSession(key) {
		sessionStorage.removeItem(key);
	}

	function setBackground(url) {
		const $panel = $("#panel");
		$panel.css("background", "url('" + url + "') center center no-repeat #666");
		$panel.css("background-size", "cover");
	}

	let _index = getSession(Enum.INDEX);

	function genBackImg() {
		const storageImgs = getSession(Enum.IMG_LIST);
		if (!storageImgs) {
			const limit = random(10);
			_index = 0;
			getBingImgs(limit).then(imgs => {
				const _img = imgs[_index];
				setBackground(_img);
				setSession(Enum.IMG_LIST, imgs);
				setSession(Enum.INDEX, _index);
			});
		} else {
			if (_index == MAX_INDEX) {
				clearSession(Enum.IMG_LIST);
				genBackImg();
			} else _index++;
			const _img = storageImgs[_index];
			setBackground(_img);
			setSession(Enum.INDEX, _index);
		}
	}

	genBackImg();

	$(".iUp").each(function (_, e) {
		iUp.up(e);
	});

	$(".js-avatar")[0].onload = function () {
		$(".js-avatar").addClass("show");
	};
});

$(".btn-mobile-menu__icon").click(function () {
	if ($(".navigation-wrapper").css("display") == "block") {
		$(".navigation-wrapper").on(
			"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
			function () {
				$(".navigation-wrapper").toggleClass("visible animated bounceOutUp");
				$(".navigation-wrapper").off(
					"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend"
				);
			}
		);
		$(".navigation-wrapper").toggleClass(
			"animated bounceInDown animated bounceOutUp"
		);
	} else {
		$(".navigation-wrapper").toggleClass("visible animated bounceInDown");
	}
	$(".btn-mobile-menu__icon").toggleClass(
		"social iconfont icon-list social iconfont icon-angleup animated fadeIn"
	);
});
