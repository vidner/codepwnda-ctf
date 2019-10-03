
/* CLIENTCONFIG build v1.0.21*/
!function (n, e) { "use strict"; var o = "1.0.21", t = "NOLBUNDLE", a = 0, r = { paramPrefix: "", maxRetries: 5 }, s = { defaultNSDKV: 600, defaultSfcode: "sdk", subdomain: "cdn-gl", domain: "imrworldwide.com", protocol: 0 === n.location.protocol.indexOf("http:") ? "http:" : "https:", sdkUrl: "{{protocol}}//{{subdomain}}.{{domain}}/novms/js/{{sdksubpath}}/nlsSDK{{nsdkv}}.bundle.min.js" }, l = { eu: "600.eu", "eu-cert": "600.eu", "eu-uat": "600.eu" }, i = { parseNOLParams: function (n) { var e = n.replace(/^[^\#]+\#?/, ""), o = {}; if (!e) return o; var t = new RegExp("&" + r.paramPrefix, "gi"), a = "<<nol_delimeter>>", s = a + r.paramPrefix; e = e.replace(t, s); for (var l = e.split(a), i = null, c = 0; c < l.length; c++){ i = l[c].indexOf("="); var u = unescape(l[c].substr(0, i)), d = unescape(l[c].substr(i + 1)); d = d.replace(/\+/g, " "), o[u.replace(r.paramPrefix, "")] = d } return o }, findScript: function (n) { if (document.currentScript) return document.currentScript.src; console && console.log && (console.log("Config", new Date), console.log("Config", new Date)); var e = document.getElementsByTagName("script"), o = []; if (e) for (var t = null, a = "", r = null, s = new RegExp(n + ".*?.js"), l = 0; l < e.length; l++)r = e[l], a = r && r.attributes && r.attributes.src ? r.attributes.src.value : "", (t = a.match(s)) && o.push(a); return o }, loadScript: function (e, o, t) { function a(e, o, t) { var a = n.document.createElement("script"); a.async = !0, a.setAttribute("data-jsonpid", name), a.src = e, a.onload = o, a.onerror = t; var r = n.document.getElementsByTagName("script")[0]; r.parentNode.insertBefore(a, r) } function s(n) { l < r.maxRetries ? (l++ , setTimeout(function () { console && console.warn && console.warn("Retry request # " + l), a(e, o, s) }, 2e3)) : (console && console.error && console.error("Unable to load script " + e), t && t()) } var l = 0; a(e, o, s) }, getGlobalsField: function (e, o, t) { if (o && t && n[e] && n[e].configs) { var a = n[e].configs[o]; if (a && a.nol_GLOBALS) return a.nol_GLOBALS[t] } return null }, getDefaultField: function (e, o, t) { if (o && t && n[e] && n[e].configs) { var a = n[e].configs[o]; if (a && a.nol_GLOBALS && a.nol_GLOBALS.nol_tagMap && a.nol_GLOBALS.nol_tagMap.nol_defaults) return a.nol_GLOBALS.nol_tagMap.nol_defaults[t] } return null } }, c = { setNamespace: function (e) { return n[e] = n[e] || { nlsQ: function (o, t, a, r, s, l) { return s = w.document, r = s.createElement("script"), r.async = 1, r.src = ("http:" === n.location.protocol ? "http:" : "https:") + "//cdn-gl.imrworldwide.com/conf/" + o + ".js#name=" + t + "&ns=" + e, l = s.getElementsByTagName("script")[0], l.parentNode.insertBefore(r, l), w[t] = w[t] || { g: a, ggPM: function (n, e, o, a, r) { (w[t].q = w[t].q || []).push([n, e, o, a, r]) } }, w[t] } } }, setConfig: function (n, e, o) { o.configs = o.configs || {}, o.configs[n] = o.configs[n] || e } }, u = { getInstanceGlobals: function (e, o, t) { var a = { apid: o, sfcode: i.getDefaultField(e, o, "nol_sfcode") || s.defaultSfcode, nsdkv: s.defaultNSDKV }, r = n[e][t.name] || n[t.name], c = r ? r.g : {}; if (c) for (var u = Object.keys(c), d = 0; d < u.length; d++)void 0 !== c[u[d]] && null !== c[u[d]] && "" !== c[u[d]] && (a[u[d]] = c[u[d]]); a.sfcode = i.getGlobalsField(e, o, "nol_sfcode") || a.sfcode, a.nsdkv = i.getGlobalsField(e, o, "nol_nsdkvConfig") || i.getGlobalsField(e, o, "nol_nsdkv") || l[a.sfcode] || a.nsdkv; var f = i.getGlobalsField(e, o, "nol_sdkDebug"); return f && (a.nol_sdkDebug = f), a }, isSDKReady: function (e) { var o = n[e]; return o && o.hasOwnProperty("isBuilt") && "function" == typeof o.isBuilt && o.isBuilt() }, loadSDK: function (e, o, t, a) { try { var r = u.getInstanceGlobals(a, o, t), l = function () { try { if (e && t && t.name) { var o = n[a].getInstance(t.name, !0); o && !o.initialized && o.ggInitialize(r) } } catch (n) { } }; if (u.isSDKReady(a)) l(); else { var c = (r && r.sdkUrl ? r.sdkUrl : s.sdkUrl).replace("{{protocol}}", s.protocol).replace("{{subdomain}}", t && t.subdomain ? t.subdomain : r && r.subdomain ? r.subdomain : s.subdomain).replace("{{domain}}", t && t.domain ? t.domain : r && r.domain ? r.domain : s.domain).replace("{{sdksubpath}}", "NOLSDKBUNDLE" === a ? "nolsdk" : "2").replace("{{nsdkv}}", r.nsdkv); i.loadScript(c, l) } } catch (n) { } }, iterateInstances: function (n, e) { if (e) { var o = i.findScript(n); if ("string" == typeof o) e(n, i.parseNOLParams(o)); else for (var t = 0; t < o.length; t++)e(n, i.parseNOLParams(o[t])) } } }, d = e && e.nol_GLOBALS ? e.nol_GLOBALS.nol_appid : ""; try { d ? u.iterateInstances(d, function (o, a) { var r = a && a.ns ? n[a.ns][a.name] : null; if (r || (r = a && a.ns ? n[a.name] : null), r && !r.initialized) { var s = c.setNamespace(a && a.ns ? a.ns : t); c.setConfig(o, e, s), u.loadSDK(s, o, a, a && a.ns ? a.ns : t) } }) : console && console.warn && console.warn("Nielsen Log: Client config structure is invalid or corrupt.") } catch (n) { } }(
    window,
	{
		"nol_GLOBALS":{
			"nol_host":"sp097",
			"nol_dma":"",
			"nol_deviceId":"",
			"nol_countryCode2":"",
			"nol_countryCode3":"",
	         "nol_errorURL":"|!nol_prefProtocol!|://secure-|!nol_sfcode!|.imrworldwide.com/cgi-bin/error?message=|!(nol_errorMessage)!|,c13_|![nol_appid]!|,c16_|![nol_sdkv]!|,c8_|![nol_devGroup]!|,c7_|![nol_osGroup]!|,c10_|![nol_platform]!|,c17_|![nol_stationId]!|,c18_|![nol_assetid]!|,c6_|![nol_product]!|,ci_|![nol_clientid]!|",
				"nol_useroptUrl_lat":"https://priv-policy.imrworldwide.com/priv/|!nol_devicetype!|/|![nol_localeCountryCode]!|/|![nol_language]!|/optout.html",
				"nol_useroptUrl":"https://priv-policy.imrworldwide.com/priv/mobile/us/en/optout_legacy.html",
            

            "nol_devGroup":"",
            "nol_osver":"NA",
            "nol_clocksrc":"S",
            "nol_osGroup":"",
            "nol_platform":"",
			"nol_clientid":"us-907786","nol_vcid":"c06","nol_clientCMSmap":{"nol_clientid":"clientid","nol_vcid":"subbrand","nol_vidtype":"type","nol_assetid":"(assetid)","nol_category":"(program)","nol_stationType":"stationType","nol_assetName":"(section)","nol_segmentA":"(segA)","nol_segmentB":"(segB)","nol_segmentC":"(segC)","nol_reportSuiteID":"(reportSuite)","nol_adobeId":"adobeId","nol_crossRefID1":"crossId1","nol_crossRefID2":"crossId2","nol_adobeSessionId":"adobeVsid","nol_progen":"progen","nol_stationId":"stationId","nol_scheduledEndDate":"((scheduledEndDate))"},"nol_sfcode":"dcr",
			"nol_cidOffsetNull":"00000",
			"nol_cidNull":"X100zdCIGeIlgZnkYj6UvQ==",
			"nol_caSeed":"2019Q1",
			"nol_tsvevt":"tsvupdate",
			"nol_md5Seed":"N!3ls3nBL",
			"nol_tsvBreakoutMap":{"enable":"00,01,02,03,04,05,06,07,08,09","disable":""},
			"nol_sdkDelimiter":"_",


            "nol_channelName":"defaultChannelName",
            "nol_fbver":"1",
            "nol_appid":"P26086A07-C7FB-4124-A679-8AC404198BA7",
            "nol_contentType":"content,radio",
			"nol_aqhDuration":"00000",
			"nol_linearAdLoadFlag":"0",
			"nol_tagSrc":"cms",
			"nol_flag":"2",
			"nol_gpsPrecision":"1000",
			"nol_intrvlThrshld":"90",
			"nol_chnlCountThrshld":"10",
			"nol_cacheBusterLmt":"1",
			"nol_id3IntrvlGp":"15",
			"nol_useragent":"NLSDK (|![nol_osver]!|,|![nol_devtypeid]!| BUILD/|![nol_sdkver]!|) |![nol_appid]!|/|![nol_appver]!|",	
			"nol_xorSeed":"cr055pltfrm",
			"nol_unQualSegmentValue":"5",
			"nol_backgroundMode":"1",
 		    "nol_assetName": "defChnAsset",
			"nol_bgTimeOut":"5",
			"nol_duration":"30",
			"nol_encryptDevId":"true",
			"nol_SDKEncDevIdFlag":"true",
			"nol_devTimeZone":"",
			"nol_apn":"",
			"nol_sdkv":"bj.6.0.0",
			"nol_suppress":"0",
			"nol_admeas":"0",
			"nol_maxStaticInstances": "5",	
			"nol_pendingPingsLimit" :"8",
			"nol_pendingPingsDelay":"1",
			"nol_staticType":"static,text",
			"nol_spFlag":"_S",
			"nol_pauseTimeout":"1800",
			"nol_maxRetry":"0",
			"nol_defReasonCode":"",
			"nol_adSupportFlg":"2",
			"nol_eventDataDelimiter":"~",
			"nol_eventDataEvents":"play,pause,resume,stop,mute,rewind,forward",
			"nol_pauseEventTimeoutPlayhead":"15",
			
            
			"nol_id3Map":{
				"nol_nWebAddress":"0",
				"nol_pccid":"1",
				"nol_fdcid": "2",
				"nol_watermark":"3",
				"nol_pcoffset":"4",
				"nol_fdoffset":"5",
				"nol_breakout":"6"
			},

			"nol_customExtension":[
				"nol_dprCustom",
				"nol_legacyCustom",
				"nol_mtvrCustom",
				"nol_drmCustom",
				"nol_mtvraqhCustom",
				"nol_drmaqhCustom",
				"nol_dprid3Custom",
				"nol_dcrVideoCustom",			
				"nol_dcrStaticCustom",			
				"nol_dcrCustomEnc",
				"nol_vriCustom"
			],
			"nol_eventFilter":{
				"onCmsDetected":[
					{"tagVar":{"name":"nol_product", "value":"dpr"}, "cond":["nol_tagSrc"], "is":{"type":"+", "value":"cms"}, "then":{"nol_disabled":"false"}, "else":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_product", "value":"drm"}, "cond":["nol_tagSrc"], "is":{"type":"+", "value":"cms"}, "then":{"nol_disabled":"false"}, "else":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_product", "value":"dprid3"}, "cond":["nol_tagSrc"], "is":{"type":"+", "value":"id3"}, "then":{"nol_disabled":"false"}, "else":{"nol_disabled":"true"}},
          			{"tagVar":{"name":"nol_product", "value":"dprid3"}, "cond":["nol_pccid","nol_fdcid"], "is":{"type":"+", "value":""}, "then":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_product", "value":"dprid3"}, "cond":["nol_tsvFlag"], "is":{"type":"+", "value":"nol_tsvMap"}, "then":{"nol_disabled":"true"}},
                    {"tagVar":{"name":"nol_product", "value":"dprid3"}, "cond":["nol_breakout"], "is":{"type":"+", "value":"09"}, "then":{"nol_disabled":"false"}},
                    {"tagVar":{"name":"nol_product", "value":"dprid3"}, "cond":["nol_linearAdLoadFlag"], "is":{"type":"+", "value":"2"}, "then":{"nol_disabled":"false"}},
                    {"tagVar":{"name":"nol_subTag", "value":"dprid3"}, "cond":["nol_pccid"], "is":{"type":"+", "value":"nol_cidNull"}, "then":{"nol_disabled":"true"}},
                    {"tagVar":{"name":"nol_subTag", "value":"dprid3"}, "cond":["nol_pccid","nol_fdcid"], "is":{"type":"-", "value":"nol_cidNull"}, "then":{"nol_disabled":"true"}},
          			{"tagVar":{"name":"nol_product", "value":"mtvr"}, "cond":["nol_tagSrc"], "is":{"type":"+", "value":"id3"}, "then":{"nol_disabled":"false"}, "else":{"nol_disabled":"false"}},
          			{"tagVar":{"name":"nol_product", "value":"mtvr"}, "cond":["nol_pccid","nol_fdcid"], "is":{"type":"+", "value":""}, "then":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_product", "value":"vc"}, "cond":["nol_tagSrc"], "is":{"type":"+", "value":"id3"}, "then":{"nol_disabled":"true"}, "else":{"nol_disabled":"false"}},
					{"tagVar":{"name":"nol_product", "value":"ocr"}, "cond":["nol_vidtype"], "is":{"type":"+", "value":"preroll,midroll,postroll,ad"}, "then":{"nol_disabled":"false"}, "else":{"nol_disabled":"true"}},					 
					{"tagVar":{"name":"nol_product","value":"dcrvideo"}, "cond": ["nol_vidtype"],  "is": {"type":"+","value": "content,preroll,midroll,postroll,ad"},  "then":{"nol_disabled": "false"}, "else": {"nol_disabled": "true"}},
					{"tagVar":{"name":"nol_product","value":"dcrstatic"},"cond":["nol_vidtype"], "is":{"type":"+", "value":"static"}, "then":{"nol_disabled":"false"}, "else":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_product","value":"vrivideo" }, "cond":["nol_vidtype"], "is":{"type":"+", "value":"content"}, "then":{"nol_disabled": "false"}, "else":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_product", "value": "dcrvideo"}, "cond": ["nol_isAudio"], "is": {"type": "+", "value": "1,true,True,TRUE,y,Y,yes,Yes,YES" }, "then": { "nol_rt": "audio" } }
				],
				"onDcrCmsDetected":[
	                                {"tagVar":{"name":"nol_product","value":"dcrstatic"}, "cond": ["nol_ac"],  "is": {"type":"+","value": "static"},  "then":{"nol_disabled": "false"}, "else": {"nol_disabled": "true"}}
	            ],
				"onDcrDetected":{
					"dcrStatic":[
						{"tagVar":{"name":"nol_product","value":"dcrstatic"}, "cond": ["nol_vidtype"],  "is": {"type":"+","value": "preroll,midroll,postroll,ad,content"},  "then":{"nol_disabled": "true"}, "else":{"nol_disabled":"false"}}
					],
					"dcrVideo":[
						{"tagVar":{"name":"nol_product","value":"dcrvideo"}, "cond": ["nol_vidtype"],  "is": {"type":"+","value": "preroll,midroll,postroll,ad,content"},  "then":{"nol_disabled": "false"}, "else":{"nol_disabled":"true"}},
						{"tagVar":{"name":"nol_product","value":"dcrvideo"}, "cond": ["nol_vidtype"],  "is": {"type":"+","value": "postroll"},  "then":{"nol_minWonOverride": "1"}}
					]
				},
				 "onOTTDetected":[
				        {"tagVar":{"name":"nol_product_content", "value":"dcrvideo"}, "cond":["nol_pingCount_content"], "is":{"type":"+", "value":"1"}, "then":{"nol_pingCount_content":"0"}}
					],
				"onId3Detected":[
					{"tagVar":{"name":"nol_product", "value":"mtvr"}, "cond":["nol_vidtype"], "is":{"type":"+", "value":"content"}, "then":{"nol_disabled":"false"}, "else":{"nol_disabled":"false"}},
					{"tagVar":{"name":"nol_product", "value":"dprid3"}, "cond":["nol_tagSrc"], "is":{"type":"+", "value":"id3"}, "then":{"nol_disabled":"false"}, "else":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_product", "value":"id3"}, "cond":["nol_vidtype"], "is":{"type":"+", "value":"content"}, "then":{"nol_disabled":"false"}, "else":{"nol_disabled":"false"}},
					{"tagVar":{"name":"nol_subTag", "value":"dprid3"}, "cond":["nol_pccid"], "is":{"type":"+", "value":"nol_cidNull"}, "then":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_subTag", "value":"mtvr"}, "cond":["nol_pccid"], "is":{"type":"+", "value":"nol_cidNull"}, "then":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_subTag", "value":"dprid3"}, "cond":["nol_pccid","nol_fdcid"], "is":{"type":"-", "value":"nol_cidNull"}, "then":{"nol_disabled":"true"}}
				],
				"onViewWon":[
					{"tagVar":{"name":"nol_cadence", "value":"interval"}, "cond":["nol_segmentPrefix"], "is":{"type":"+", "value":"S"}, "then":{"nol_segmentPrefix":"D"}},
					{"tagVar":{"name":"nol_cadence", "value":"interval"}, "cond":["nol_segmentPrefix"], "is":{"type":"+", "value":"D"}, "then":{"nol_at":"timer"}},
					{"tagVar":{"name":"nol_subProduct", "value":"fb_dpr"}, "cond":["nol_segmentPrefix"], "is":{"type":"+", "value":"D"}, "then":{"nol_fbCountryCode":""}},
					{"tagVar":{"name":"nol_subProduct", "value":"fb_drm"}, "cond":["nol_segmentPrefix"], "is":{"type":"+", "value":"D"}, "then":{"nol_fbCountryCode":""}},
					{"tagVar":{"name":"nol_subProduct", "value":"fb_mtvr"}, "cond":["nol_segmentPrefix"], "is":{"type":"+", "value":"D"}, "then":{"nol_fbCountryCode":""}},
					{"tagVar":{"name":"nol_subProduct", "value":"fb_drm"}, "cond":["nol_segmentPrefix"], "is":{"type":"+", "value":"V"}, "then":{"nol_fbCountryCode":"IMP"}}
				],
				"onAssetIdChanged":[
					{"tagVar":{"name":"nol_product", "value":"dpr"}, "cond":["nol_vidtype"], "is":{"type":"-", "value":"content"}, "then":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_product", "value":"dprid3"}, "cond":["nol_vidtype"], "is":{"type":"-", "value":"content"}, "then":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_product", "value":"dpr"}, "cond":["nol_assetid"], "is":{"type":"+", "value":""}, "then":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_product", "value":"dpr"}, "cond":["nol_dpr"], "is":{"type":"+", "value":"true"}, "then":{"nol_forward":"1","nol_aggregate":"1"}, "else":{"nol_forward":"0","nol_aggregate":"0"}},
					{"tagVar":{"name":"nol_product", "value":"drm"}, "cond":["nol_vidtype"], "is":{"type":"-", "value":"radio"}, "then":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_product", "value":"drm"}, "cond":["nol_assetid"], "is":{"type":"+", "value":""}, "then":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_product", "value":"ocr"}, "cond":["nol_ocrtag"], "is":{"type":"+", "value":""}, "then":{"nol_disabled":"true"}, "else":{"nol_disabled":"false"}},
					{"tagVar":{"name":"nol_cadence", "value":"streamduration"}, "cond": ["nol_ac"],  "is": {"type":"+","value": "ad"},  "then":{"nol_disabled": "false"}, "else":{"nol_disabled": "true"}},
					{"tagVar":{"name":"nol_product", "value": "dcrvideo"}, "cond": ["nol_isAudio"], "is": {"type": "+", "value": "1,true,True,TRUE,y,Y,yes,Yes,YES" }, "then": { "nol_rt": "audio" } }
				],
				"onId3FdCidChanged":[
					{"tagVar":{"name":"nol_product", "value":"mtvr"}, "cond":["nol_fdcid"], "is":{"type":"+", "value":"nol_cidNull"}, "then":{"nol_disabled":"true"}, "else":{"nol_disabled": "false", "nol_forward": "1", "nol_aggregate": "1"} },
					{"tagVar":{"name":"nol_product", "value":"dprid3"}, "cond":["nol_fdcid"], "is":{"type":"+", "value":""}, "then":{"nol_disabled":"true"}}
				],
				"onId3PcCidChanged":[
					{"tagVar":{"name":"nol_subTag", "value":"mtvr"}, "cond":["nol_pccid"], "is":{"type":"+", "value":"nol_cidNull"}, "then":{"nol_disabled":"true"}, "else":{"nol_disabled":"false", "nol_forward":"1","nol_aggregate":"1"}},
					{"tagVar":{"name":"nol_subTag", "value":"mtvr"}, "cond":["nol_pccid","nol_fdcid"], "is":{"type":"-", "value":"nol_cidNull"}, "then":{"nol_forward":"0","nol_aggregate":"0"},"else":{"nol_forward":"1","nol_aggregate":"1"}},
					{"tagVar":{"name":"nol_subTag", "value":"dprid3"}, "cond":["nol_pccid"], "is":{"type":"+", "value":"nol_cidNull"}, "then":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_product", "value":"mtvr"}, "cond":["nol_fdrtvod"], "is":{"type":"+", "value":"1"}, "then":{"nol_forward":"0", "nol_aggregate":"0"}},
					{"tagVar":{"name":"nol_subTag", "value":"mtvr"}, "cond":["nol_fdrtvod"], "is":{"type":"+", "value":"1"}, "then":{"nol_forward":"1", "nol_aggregate":"1"}}
				],
				"nol_tagFilter":[
					{"tagVar":{"name":"nol_product", "value":"mtvr"}, "cond":["nol_fdcid"], "is":{"type":"+", "value":"nol_cidNull"}, "then":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_product", "value":"dprid3"}, "cond":["nol_fdcid"], "is":{"type":"+", "value":""}, "then":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_subTag", "value":"mtvr"}, "cond":["nol_pccid"], "is":{"type":"+", "value":"nol_cidNull"}, "then":{"nol_disabled":"true"}, "else":{"nol_disabled":"false", "nol_forward":"1","nol_aggregate":"1"}},
					{"tagVar":{"name":"nol_subTag", "value":"mtvr"}, "cond":["nol_pccid","nol_fdcid"], "is":{"type":"-", "value":"nol_cidNull"}, "then":{"nol_forward":"0","nol_aggregate":"0"},"else":{"nol_forward":"1","nol_aggregate":"1"}},
					{"tagVar":{"name":"nol_subTag", "value":"dprid3"}, "cond":["nol_pccid"], "is":{"type":"+", "value":"nol_cidNull"}, "then":{"nol_disabled":"true"}} 
				],
				"onComplete":[
					{"tagVar":{"name":"nol_product", "value":"dprid3"}, "cond":["nol_breakout"], "is":{"type":"+", "value":"03"}, "then":{"nol_tsvMap":"00,01,02,03,04"}, "else":{"nol_tsvMap":"00,01,02,03,04,05,06,07,08"}},
					{"tagVar":{"name":"nol_subProduct", "value":"fb_dpr"}, "cond":["nol_aggregate"], "is":{"type":"+", "value":"1"}, "then":{"nol_disabled":"false"}, "else":{"nol_disabled":"true"}},                                                                              
					{"tagVar":{"name":"nol_subProduct", "value":"fb_drm"}, "cond":["nol_aggregate"], "is":{"type":"+", "value":"1"}, "then":{"nol_disabled":"false"}, "else":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_subProduct", "value":"fb_mtvr"}, "cond":["nol_aggregate"], "is":{"type":"+", "value":"1"}, "then":{"nol_disabled":"false"}, "else":{"nol_disabled":"true"}},
					{"tagVar":{"name":"nol_subProduct", "value":"fb_dpr"}, "cond":["nol_segmentPrefix"], "is":{"type":"+", "value":"S"}, "then":{"nol_fbCountryCode":"IMP"}},
					{"tagVar":{"name":"nol_subProduct", "value":"fb_drm"}, "cond":["nol_segmentPrefix"], "is":{"type":"+", "value":"S"}, "then":{"nol_fbCountryCode":""}},
					{"tagVar":{"name":"nol_subProduct", "value":"fb_mtvr"}, "cond":["nol_segmentPrefix"], "is":{"type":"+", "value":"S"}, "then":{"nol_fbCountryCode":"IMP"}}										
				],
				"onPaginateDetected":[
				    {"tagVar":{"name":"nol_product","value":"dcrstatic"}, "cond":["nol_pingCount"],  "is": {"type":"-","value": "0"}, "then":{"nol_pingCount": "0"}}
				],
				"onEndDetected":[
				                 
				                 {"tagVar":{"name":"nol_product","value":"dcrvideo"}, "cond": ["nol_davty"],  "is": {"type":"+","value": "1"},  "then":{"nol_davty": "2"}},
				                 {"tagVar":{"name":"nol_product","value":"dcrstatic"}, "cond": ["nol_davty"],  "is": {"type":"+","value": "1"},  "then":{"nol_davty": "2"}},
				                 {"tagVar":{"name":"nol_product","value": "mtvr"}, "cond": ["nol_davty"], "is": {"type": "+","value": "1"}, "then": {"nol_davty": "2"}},
				                 {"tagVar":{"name":"nol_product","value": "drm"}, "cond": ["nol_davty"], "is": {"type": "+","value": "1"}, "then": {"nol_davty": "2"}}

				],
	            "onAdLoadFlag": [
	         				    { "tagVar": { "name": "nol_product", "value": "dcrvideo" }, "cond": ["nol_adLoadType"], "is": { "type": "+", "value": "dynamic" }, "then": { "nol_adLoadType": "2" } },
	         				    { "tagVar": { "name": "nol_product", "value": "dcrvideo" }, "cond": ["nol_adLoadType"], "is": { "type": "+", "value": "linear" }, "then": { "nol_adLoadType": "1" } },
	         				    { "tagVar": { "name": "nol_product", "value": "dcrvideo" }, "cond": ["nol_adLoadType"], "is": { "type": "-", "value": "1,2" }, "then": { "nol_adLoadType": "2" } },
	         					{ "tagVar": { "name": "nol_subProduct", "value": "fb" }, "cond": ["nol_adLoadType"], "is": { "type": "+", "value": "1" }, "then": { "nol_disabled": "true" }, "else": { "nol_disabled": "false" } }
	         	            ]
				
				 
			  },
			 
			  "nol_serviceFilter": {
					"tsv": [
						{"tagVar":{"name":"nol_product", "value":"dprid3"}, "cond":["nol_tsvFlag"], "is":{"type":"+", "value":"nol_tsvMap"}, "then":{"nol_disabled":"true"}},
						{"tagVar":{"name":"nol_product", "value":"dprid3"}, "cond":["nol_breakout"], "is":{"type":"+", "value":"09"}, "then":{"nol_disabled":"false"}},
						{"tagVar":{"name":"nol_product", "value":"dprid3"}, "cond":["nol_linearAdLoadFlag"], "is":{"type":"+", "value":"2"}, "then":{"nol_disabled":"false"}},
						{"tagVar":{"name":"nol_product", "value":"mtvr"}, "cond":["nol_fdrtvod"], "is":{"type":"+", "value":"1"}, "then":{"nol_forward":"0", "nol_aggregate":"0"}},
				        {"tagVar":{"name":"nol_subTag", "value":"mtvr"}, "cond":["nol_fdrtvod"], "is":{"type":"+", "value":"1"}, "then":{"nol_forward":"1", "nol_aggregate":"1"},"else":{"nol_forward":"0","nol_aggregate":"0"}},
				        {"tagVar":{"name":"nol_subTag", "value":"mtvr"}, "cond":["nol_fdcid"], "is":{"type":"+", "value":"nol_cidNull"}, "then":{"nol_forward":"1", "nol_aggregate":"1" }}
					],
					"stn": []
			},
			"nol_tagMap":{
				"nol_product":["dpr","mtvr","vc", "id3", "ocr", "drm", "dprid3","dcrstatic", "dcrvideo","vrivideo"], 
				"nol_cadence":["interval", "episode", "stream", "impression", "daypart", "appstart","streamduration","modcadence"],  
				"nol_defaults":{
					"nol_sessionURL":"|!nol_prefProtocol!|://secure-|!nol_sfcode!|.imrworldwide.com/cgi-bin/gn?prd=session&c9=devid,|![nol_deviceId]!|&c13=asid,|!nol_appid!|&sessionId=|!nol_userSessionId!|&c16=sdkv,|!nol_sdkv!|&uoo=|![nol_useroptout]!|&retry=|![nol_retry]!|",
					"nol_creditFlag":"1",
					"nol_creditValue":"30",
					"nol_segmentLength":"5",
					"nol_segmentValue":"60",
					"nol_maxLength":"1832",
					"nol_forward":"1",
					"nol_aggregate":"1",
					"nol_tsvFlag":"99",
					"nol_rt":"video",
					"nol_accessMethod":"0",
					"nol_breakout":"00",
					"nol_currSeg":"0",
					"nol_minWonOverride":"0",
					"nol_segmentA":"NA",
					"nol_segmentB":"NA",
					"nol_segmentC":"NA",
					"nol_placement":"NA",
					"nol_content":"NA",
					"nol_adLoadType":"2",
					"nol_segmentTimeSpent":"0",
					"nol_adDuration":"0",
					"nol_adCount":"0",
					"nol_isFullEpisode":"n",
					"nol_emmURL":"https://|![(nol_userSessionId)]!|.nuid.imrworldwide.com",
					"nol_prefProtocol":"https",
					"nol_sfcode":"sdk",
	        		"nol_dcrsfcode":"sdk",
					"nol_sendTime":"0",
					"nol_davty":"0"
				},
				"nol_url":[
"",
"",
"",
"",
"",
"|!nol_ocrtag!|&c9=devid,|![nol_deviceId]!|&c8=devgrp,&c29=plid,|![nol_playerId]!|&c30=bldv,|![nol_bldv]!|&c7=osgrp,&c10=plt,&c11=agg,|!nol_aggregate!|&c12=apv,&c13=asid,P26086A07-C7FB-4124-A679-8AC404198BA7&c14=osver,NA&c26=dmap,3&c24=zip,99&uoo=|![nol_useroptout]!|&c68=bndlid,&c61=createtm,|![nol_createTime||nol_pingCreationTime]!|&c62=sendTime,|![nol_sendTime]!|&nodeTM=|![nol_nodetm]!|&logTM=|![nol_logtm]!|&c73=phtype,&c74=dvcnm,",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"",
"|!nol_prefProtocol!|://secure-|!nol_dcrsfcode!|.imrworldwide.com/cgi-bin/gn?prd=dcr&ci=|!nol_clientid!|&ch=|!nol_clientid+nol_sdkDelimiter+nol_vcid+nol_sdkDelimiter+nol_assetName+[nol_spFlag]!|&asn=|!nol_assetName!|&sessionId=|![(nol_userSessionId)]!|&prv=1&c6=vc,|![nol_vcid]!|&ca=|!nol_content!|&c13=asid,P26086A07-C7FB-4124-A679-8AC404198BA7&c32=segA,|![nol_segmentA]!|&c33=segB,|![nol_segmentB]!|&c34=segC,|![nol_segmentC]!|&c15=apn,|![nol_apn]!|&sup=0&segment2=|![nol_dma]!|&segment1=|!([nol_countryCode3])!|&forward=|![nol_forward]!|&plugv=|![nol_plugv]!|&playerv=|![nol_playerv]!|&ad=|!nol_accessMethod!|&cr=|!nol_segmentPrefix!|&c9=devid,|![nol_deviceId]!|&enc=|!nol_encryptDevId!|&c1=nuid,|![nol_nuid||nol_playerId]!|&at=|!nol_at!|&rt=|!nol_rt!|&c16=sdkv,|![nol_sdkv]!|&c27=cln,|![nol_segmentTimeSpent]!|&crs=|![nol_appCrash]!|&lat=|![nol_latitude]!|&lon=|![nol_longitude]!|&c29=plid,|![nol_playerId]!|&c30=bldv,|![nol_bldv]!|&st=dcr&c7=osgrp,|![nol_osGroup]!|&c8=devgrp,|![nol_devGroup]!|&c10=plt,|!([nol_platform])!|&c40=adbid,|![nol_adobeId]!|&c14=osver,|![(nol_osver)]!|&c26=dmap,1&dd=|![nol_dataDate]!|&hrd=|![nol_hourCode]!|&wkd=|![nol_dayId]!|&c35=adrsid,|![nol_reportSuiteID]!|&c36=cref1,|![nol_crossRefID1]!|&c37=cref2,|![nol_crossRefID2]!|&c11=agg,|!nol_aggregate!|&c12=apv,&c51=adl,|![nol_adDuration]!|&c52=noad,|![nol_adCount]!|&devtypid=|![nol_devtypeid]!|&pc=NA&c53=fef,|![nol_isFullEpisode]!|&c54=oad,|![nol_airDate]!|&c55=cref3,|![nol_cref3]!|&c57=adldf,|![nol_adLoadType]!|&ai=|![nol_assetid]!|&c3=|![nol_c3]!|&c64=starttm,|![nol_pingStartTimeUTC]!|&adid=|![nol_assetid]!|&c58=isLive,|![nol_isLive_content]!|&c59=sesid,|![nol_sessionId_content]!|&c61=createtm,|![nol_createTime||nol_pingCreationTime]!|&c63=pipMode,|![nol_pipMode_content]!||![nol_dcrStaticCustom]!|&uoo=|![nol_useroptout]!|&c62=sendTime,|![nol_sendTime]!|&c68=bndlid,&nodeTM=|![nol_nodetm]!|&logTM=|![nol_logtm]!|&c73=phtype,&c74=dvcnm,&c76=adbsnid,|![nol_adobeSessionId]!|&c44=progen,|![(nol_progen)]!|&davty=|![nol_davty_static]!|&si=|![(nol_pageURL)]!|&c66=mediaurl,|![(nol_mediaURL)]!|",
"",
"",
"",
"",
"",
"",
""
      
				]
			}
		},
		"nol_TAGS":[
						
						{
							"nol_comment":"DCR browser static view",
							"nol_product":"7",
							"nol_cadence":"3",
							"nol_defaults":{"nol_maxPingCount":"1", "nol_creditFlag":"0", "nol_segmentPrefix":"V", "nol_timer":"nol_pageoffset","nol_at":"view", "nol_tagPresence":"4","nol_rt": "text","nol_segmentTimeSpent":"0","nol_adDuration":"0","nol_adCount":"0","nol_c3":"st,c","nol_davty":"0"},
							"nol_url":"17"
						},

						{
							"nol_comment":"DCR browser static duration",
							"nol_product":"7",
							"nol_cadence":"0",
							"nol_defaults":{"nol_minWonOverride":"1","nol_creditFlag":"1","nol_segmentPrefix":"D","nol_timer":"nol_pageoffset","nol_at":"timer","nol_rt": "text", "nol_tagPresence":"4","nol_segmentLength":"30","nol_segmentTimeSpent":"0","nol_adDuration":"0","nol_adCount":"0","nol_c3":"st,c","nol_davty":"1"},	
							"nol_url":"17"
						},
						

							{
								"nol_comment":"ID3 raw red herring",
								"nol_product":"3",
								"nol_cadence":"0",
								"nol_url":"4",
								"nol_defaults":{"nol_tagPresence":"2"},
				                "nol_flag":"2"
							},


						{
							"nol_comment":"OCR tag",
							"nol_product":"4",
							"nol_cadence":"3",
							"nol_defaults":{"nol_maxPingCount":"1", "nol_timer":"nol_cmsoffset"},
							"nol_url":"5"
						}

		]
	}
	);		
