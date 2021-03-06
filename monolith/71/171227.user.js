// ==UserScript==
// @name        Fimfiction Emote Expander
// @namespace   ffemoteextenderexpander
// @description Auto Expands all ffemotes from ffemoteextender
// @include     http*://www.fimfiction.net/*
// @include     http*://fimfiction.net/*
// @grant       none
// @require     https://github.com/iloveportalz0r/fimfiction-script/raw/master/emoteHandler.js
// @version     1.0
// ==/UserScript==
$(document).ready(function(){
    var urls=["http://i.imgur.com/IdiNEoG.png",
              "http://i.imgur.com/zi55aHB.png",
              "http://i.imgur.com/Z9dmrsL.png",
              "http://i.imgur.com/etvChCJ.png",
              "http://i.imgur.com/4CT6FFE.png",
              "http://i.imgur.com/sqalbWn.png",
              "http://i.imgur.com/rRAQgvt.png",
              "http://i.imgur.com/8uzdXWe.png",
              "http://i.imgur.com/PsTsg73.png",
              "http://i.imgur.com/7OlsrI3.png",
              "http://i.imgur.com/PC1vZ9r.png",
              "http://i.imgur.com/NBEDt.png",
              "http://i.imgur.com/TkVcM.png",
              "http://i.imgur.com/hCkff.png",
              "http://i.imgur.com/FlxUX.png",
              "http://i.imgur.com/AhJQA.png",
              "http://i.imgur.com/ZebG2.png",
              "http://i.imgur.com/teICa.png",
              "http://i.imgur.com/QwaS1.png",
              "http://i.imgur.com/fIvet.png",
              "http://i.imgur.com/tkMRq.png",
              "http://i.imgur.com/sHp29.png",
              "http://i.imgur.com/DKLH4.png",
              "http://i.imgur.com/5Tp73.png",
              "http://i.imgur.com/N6frZ.png",
              "http://i.imgur.com/qDNQJ.png",
              "http://i.imgur.com/uVj8R.png",
              "http://i.imgur.com/CGBhB.png",
              "http://i.imgur.com/20x2X.png",
              "http://i.imgur.com/cgoor.png",
              "http://i.imgur.com/EYLpq.png",
              "http://i.imgur.com/oa0BJ.png",
              "http://i.imgur.com/Mpt2V.png",
              "http://i.imgur.com/tCets.png",
              "http://i.imgur.com/ZNGZn.png",
              "http://i.imgur.com/sYAzM.png",
              "http://i.imgur.com/ojb2X.png",
              "http://i.imgur.com/6skeR.png",
              "http://i.imgur.com/Ma3vZ.png",
              "http://i.imgur.com/VViKq.png",
              "http://i.imgur.com/BxLgU.png",
              "http://i.imgur.com/ULdav.png",
              "http://i.imgur.com/Wtyb9.png",
              "http://i.imgur.com/ZQwXp.png",
              "http://i.imgur.com/xJ9hG.png",
              "http://i.imgur.com/TVh3T.png",
              "http://i.imgur.com/Av7mi.png",
              "http://i.imgur.com/zbSFhpV.png",
              "http://i.imgur.com/oaEI1BM.png",
              "http://i.imgur.com/dObdk0h.png",
              "http://i.imgur.com/bEP8EQ2.png",
              "http://i.imgur.com/PKx4m.png",
              "http://i.imgur.com/30Blc.png",
              "http://i.imgur.com/i3eNB.png",
              "http://i.imgur.com/J1YdP.png",
              "http://i.imgur.com/mMp7L.png",
              "http://i.imgur.com/HZlOi.png",
              "http://i.imgur.com/wLZl0.png",
              "http://i.imgur.com/dB5nN.png",
              "http://i.imgur.com/iX6uT.png",
              "http://i.imgur.com/TAnnF.png",
              "http://i.imgur.com/YI5jr.png",
              "http://i.imgur.com/Kv8nA.png",
              "http://i.imgur.com/yGwJZ.png",
              "http://i.imgur.com/lebxZ.png",
              "http://i.imgur.com/QcNTf.png",
              "http://i.imgur.com/BoPE4.png",
              "http://i.imgur.com/AUoqx.png",
              "http://i.imgur.com/gphLa.png",
              "http://i.imgur.com/7PYFy.png",
              "http://i.imgur.com/qACFB.png",
              "http://i.imgur.com/DHDbq.png",
              "http://i.imgur.com/DHfUL.png",
              "http://i.imgur.com/DGsL3.png",
              "http://i.imgur.com/9YyaH.png",
              "http://i.imgur.com/REXzM.png",
              "http://i.imgur.com/eAjva.png",
              "http://i.imgur.com/DobP4.png",
              "http://i.imgur.com/OzWNB.png",
              "http://i.imgur.com/8zRAx.png",
              "http://i.imgur.com/NZ9LG.png",
              "http://i.imgur.com/DiqwR.png",
              "http://i.imgur.com/jjgRs.png",
              "http://i.imgur.com/yEdBp.png",
              "http://i.imgur.com/BbPhC.png",
              "http://i.imgur.com/eWyjh.png",
              "http://i.imgur.com/lyj7g.png",
              "http://i.imgur.com/SUAwQ.png",
              "http://i.imgur.com/JT3f7.png",
              "http://i.imgur.com/UQUPg.png",
              "http://i.imgur.com/aMNtT.png",
              "http://i.imgur.com/oZUgV.png",
              "http://i.imgur.com/XtUF0.png",
              "http://i.imgur.com/o42xN.png",
              "http://i.imgur.com/uCBdE.png",
              "http://i.imgur.com/h6FPh.png",
              "http://i.imgur.com/Zvhzz.png",
              "http://i.imgur.com/qO3Da.png",
              "http://i.imgur.com/UGWzB.png",
              "http://i.imgur.com/477xD.png",
              "http://i.imgur.com/H718D.png",
              "http://i.imgur.com/9HNfn.png",
              "http://i.imgur.com/rv8JX.png",
              "http://i.imgur.com/aBIJ1.png",
              "http://i.imgur.com/DmoWN.png",
              "http://i.imgur.com/RXtaw.png",
              "http://i.imgur.com/u3SP8.png",
              "http://i.imgur.com/ZkYG2.png",
              "http://i.imgur.com/zI6pj.png",
              "http://i.imgur.com/NRtTF.png",
              "http://i.imgur.com/u9iJV.png",
              "http://i.imgur.com/BDNMW.png",
              "http://i.imgur.com/uEidI.png",
              "http://i.imgur.com/ahOjP.png",
              "http://i.imgur.com/fH5FO.png",
              "http://i.imgur.com/gl6yp.png",
              "http://i.imgur.com/j4frQ.png",
              "http://i.imgur.com/pjagI.png",
              "http://i.imgur.com/GmNPM.png",
              "http://i.imgur.com/GIV4g.png",
              "http://i.imgur.com/rTIx4.png",
              "http://i.imgur.com/5faXAtj.png",
              "http://i.imgur.com/5wxoPUa.png",
              "http://i.imgur.com/3Sr1ACU.png",
              "http://i.imgur.com/pV4j88A.png",
              "http://i.imgur.com/CqXDDh6.png",
              "http://i.imgur.com/LbXFj.png",
              "http://i.imgur.com/QoZIz.png",
              "http://i.imgur.com/lx5pI.png",
              "http://i.imgur.com/UwaXc.png",
              "http://i.imgur.com/kXPdl.png",
              "http://i.imgur.com/nXFjR.png",
              "http://i.imgur.com/IMGC8.png",
              "http://i.imgur.com/0lMv9.png",
              "http://i.imgur.com/VK1CV.png",
              "http://i.imgur.com/2tu9n.png",
              "http://i.imgur.com/dWaeV.png",
              "http://i.imgur.com/W9ZCa.png",
              "http://i.imgur.com/xeWgy.png",
              "http://i.imgur.com/EKbat.png",
              "http://i.imgur.com/563Gv.png",
              "http://i.imgur.com/nh9dv.png",
              "http://i.imgur.com/xo9Mr.png",
              "http://i.imgur.com/Y7iEz.png",
              "http://i.imgur.com/mmjN8.png",
              "http://i.imgur.com/a9ddz.png",
              "http://i.imgur.com/cvM4P.png",
              "http://i.imgur.com/MdJgU.png",
              "http://i.imgur.com/Ku52Y.png",
              "http://i.imgur.com/MGw7s.png",
              "http://i.imgur.com/IbDeO.png",
              "http://i.imgur.com/vBxYG.png",
              "http://i.imgur.com/DN4kI.png",
              "http://i.imgur.com/jorT3.png",
              "http://i.imgur.com/2DFdg.png",
              "http://i.imgur.com/P83z2.png",
              "http://i.imgur.com/dVnqE.png",
              "http://i.imgur.com/TAf9J.png",
              "http://i.imgur.com/gNxjD.png",
              "http://i.imgur.com/JmYib.png",
              "http://i.imgur.com/aPZth.png",
              "http://i.imgur.com/4sZY1.png",
              "http://i.imgur.com/1NN8f.png",
              "http://i.imgur.com/xmRQV.png",
              "http://i.imgur.com/lGb8P.png",
              "http://i.imgur.com/0zTKq.png",
              "http://i.imgur.com/BeQHk.png",
              "http://i.imgur.com/fl6ox.png",
              "http://i.imgur.com/mbZjl.png",
              "http://i.imgur.com/r19vB.png",
              "http://i.imgur.com/hMgvT.png",
              "http://i.imgur.com/ZCoEh.png",
              "http://i.imgur.com/1ppRy.png",
              "http://i.imgur.com/kjSfI.png",
              "http://i.imgur.com/pwUmu.png",
              "http://i.imgur.com/geqle.png",
              "http://i.imgur.com/LOrxf.png",
              "http://i.imgur.com/Evd0x.png",
              "http://i.imgur.com/tjCXQ.png",
              "http://i.imgur.com/NlvYtnA.png",
              "http://i.imgur.com/Qe7TiLt.png",
              "http://i.imgur.com/yAmRYea.png",
              "http://i.imgur.com/pww1wjm.png",
              "http://i.imgur.com/KZHFE8U.png",
              "http://i.imgur.com/MZsrxQK.png",
              "http://i.imgur.com/aHVIEJf.png",
              "http://i.imgur.com/DPk2NZn.png",
              "http://i.imgur.com/ogtnDnC.png",
              "http://i.imgur.com/oBAx788.png",
              "http://i.imgur.com/myOBKB4.png",
              "http://i.imgur.com/LRD2W70.png",
              "http://i.imgur.com/sb2Qbof.png",
              "http://i.imgur.com/24nRCr5.png",
              "http://i.imgur.com/AFuKMoD.png",
              "http://i.imgur.com/mkCLMHb.png",
              "http://i.imgur.com/IOcuWkK.png",
              "http://i.imgur.com/YUeUKME.png",
              "http://i.imgur.com/z4PAdhi.png",
              "http://i.imgur.com/wwVpoHt.png",
              "http://i.imgur.com/cSViT7t.png",
              "http://i.imgur.com/3UFhl3F.png",
              "http://i.imgur.com/968NYEH.png",
              "http://i.imgur.com/HUbolAq.png",
              "http://i.imgur.com/Ade2YQ4.png",
              "http://i.imgur.com/nirPCDd.png",
              "http://i.imgur.com/MHYaQsA.png",
              "http://i.imgur.com/r4SxEH3.png",
              "http://i.imgur.com/xZjtFqi.png",
              "http://i.imgur.com/5c1j3xv.png",
              "http://i.imgur.com/uSOX8aw.png",
              "http://i.imgur.com/EcWBGKl.png",
              "http://i.imgur.com/hkeh1qO.png",
              "http://i.imgur.com/zFPxSbB.png",
              "http://i.imgur.com/UgQIIgZ.png",
              "http://i.imgur.com/7LN4PGP.png",
              "http://i.imgur.com/Ar4a6oI.png",
              "http://i.imgur.com/Tsg6sSk.png",
              "http://i.imgur.com/3Bw1vJc.png",
              "http://i.imgur.com/1mJFi.png",
              "http://i.imgur.com/fQFdk.png",
              "http://i.imgur.com/5JXsL.png",
              "http://i.imgur.com/drWSW.png",
              "http://i.imgur.com/r1Eed.png",
              "http://i.imgur.com/mI2kf.png",
              "http://i.imgur.com/JJakx.png",
              "http://i.imgur.com/2mIou.png",
              "http://i.imgur.com/l49YA.png",
              "http://i.imgur.com/Bo3i2.png",
              "http://i.imgur.com/F4J97.png",
              "http://i.imgur.com/99WZ6.png",
              "http://i.imgur.com/KgKuu.png",
              "http://i.imgur.com/ys5RX.png",
              "http://i.imgur.com/m10uz.png",
              "http://i.imgur.com/AJ9zx.png",
              "http://i.imgur.com/81dJd.png",
              "http://i.imgur.com/vc4Ok.png",
              "http://i.imgur.com/e09RZ.png",
              "http://i.imgur.com/Uvt7B.png",
              "http://i.imgur.com/DupLe.png",
              "http://i.imgur.com/Am3AY.png",
              "http://i.imgur.com/7TZmw.png",
              "http://i.imgur.com/72IFYgG.png",
              "http://i.imgur.com/xq9lagn.png",
              "http://i.imgur.com/Cqzgjte.png",
              "http://i.imgur.com/fmPKYjE.png",
              "http://i.imgur.com/ZaEN90U.png",
              "http://i.imgur.com/1bcgbrm.png",
              "http://i.imgur.com/aJbPeur.png",
              "http://i.imgur.com/DuTtzKD.png",
              "http://i.imgur.com/KluyWmn.png",
              "http://i.imgur.com/cUszKbb.png",
              "http://i.imgur.com/9yFw70j.png",
              "http://i.imgur.com/hyH6usq.png",
              "http://i.imgur.com/CpZgXTk.png",
              "http://i.imgur.com/hT1CSak.png",
              "http://i.imgur.com/HDAG3B9.png",
              "http://i.imgur.com/tHHlMgs.png",
              "http://i.imgur.com/GLRdqlz.png",
              "http://i.imgur.com/dwryYQj.png",
              "http://i.imgur.com/pqytDZN.png",
              "http://i.imgur.com/JqAPTWq.png",
              "http://i.imgur.com/mmVWxDL.png",
              "http://i.imgur.com/YHqF6Oe.png",
              "http://i.imgur.com/BTkTZtQ.png",
              "http://i.imgur.com/ijHyYGN.png",
              "http://i.imgur.com/H93RXx3.png",
              "http://i.imgur.com/rqasPvb.png",
              "http://i.imgur.com/qrNLnm7.png",
              "http://i.imgur.com/gSUBQJo.png",
              "http://i.imgur.com/L82FBf7.png",
              "http://i.imgur.com/uUFRVSw.png",
              "http://i.imgur.com/9cktQCa.png",
              "http://i.imgur.com/FIMTF9F.png",
              "http://i.imgur.com/6Xjr4qx.png",
              "http://i.imgur.com/8FLpgzg.png",
              "http://i.imgur.com/zDp89aN.png",
              "http://i.imgur.com/5OGeQ.png",
              "http://i.imgur.com/hs7Hh.png",
              "http://i.imgur.com/Srz3i.png",
              "http://i.imgur.com/HlSYp.png",
              "http://i.imgur.com/2652g.png",
              "http://i.imgur.com/NmMWv.png",
              "http://i.imgur.com/Ccokh.png",
              "http://i.imgur.com/hgIE1.png",
              "http://i.imgur.com/hRqZN.png",
              "http://i.imgur.com/2hXpy.png",
              "http://i.imgur.com/ZsI8b.png",
              "http://i.imgur.com/fGB3u.png",
              "http://i.imgur.com/1wjw2.png",
              "http://i.imgur.com/wnSmS.png",
              "http://i.imgur.com/r0Rhe.png",
              "http://i.imgur.com/cCChp.png",
              "http://i.imgur.com/UkpBz.png",
              "http://i.imgur.com/MRdvo.png",
              "http://i.imgur.com/OJHNg.png",
              "http://i.imgur.com/IZJSZ.png",
              "http://i.imgur.com/z2R9A.png",
              "http://i.imgur.com/AKn7J.png",
              "http://i.imgur.com/djjrzly.png",
              "http://i.imgur.com/u91K3lE.png",
              "http://i.imgur.com/6amBMsZ.png",
              "http://i.imgur.com/8MaDTLV.png",
              "http://i.imgur.com/SspLS12.png",
              "http://i.imgur.com/SGKxDhn.png",
              "http://i.imgur.com/OL1DowU.png",
              "http://i.imgur.com/lSIizWD.png",
              "http://i.imgur.com/zbei6cO.png",
              "http://i.imgur.com/zplekGi.png",
              "http://i.imgur.com/jvzynek.png",
              "http://i.imgur.com/LMtxcao.png",
              "http://i.imgur.com/7ppPcYn.png",
              "http://i.imgur.com/4doC5ED.png",
              "http://i.imgur.com/MQBZ41g.png",
              "http://i.imgur.com/pdLkfXA.png",
              "http://i.imgur.com/NwyjTTE.png",
              "http://i.imgur.com/Q7KFdL7.png",
              "http://i.imgur.com/q4uECGh.png",
              "http://i.imgur.com/4M5fMay.png",
              "http://i.imgur.com/8BDWuaI.png",
              "http://i.imgur.com/sBq1PM1.png",
              "http://i.imgur.com/Ok4LXo8.png",
              "http://i.imgur.com/fiITL.png",
              "http://i.imgur.com/inSsXQt.png",
              "http://i.imgur.com/tDOuj3P.png",
              "http://i.imgur.com/Gh1mXeB.png",
              "http://i.imgur.com/O7YJl8D.png",
              "http://i.imgur.com/JZ7Qjcd.png",
              "http://i.imgur.com/njZ7Ocd.png",
              "http://i.imgur.com/5HOAGsD.png"];
    $("a.user_image_link").each( function(index) {
        if ( $(this).attr('href').match("^http://i.imgur.com/") && $.inArray(this.href, urls)>=0 ) {
            $(this).parent().replaceWith('<img src="' + this.href + '" />');
        }    
    });
});