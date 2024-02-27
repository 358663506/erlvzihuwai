huidy:
或者这块的业务你看的哪个文档？我根据文档写个小 demo 跟你调

Felix:
import UIKit
import WebKit

// http://mc-pro-api-test.meiquc.cn/camera-ipad-h5/pages/composite-report/composite-report?token=&reportId=&cusId=   综合报告
class GeneralReportViewController: UIViewController {
    var reportId: String!
    var cusId: String!
    private var wkWebView: WKWebView!
    private var requestUrl: String!
    private var token: String?
    
    private var printBarButtonItem: UIBarButtonItem!
    private var screenshotBarButtonItem: UIBarButtonItem!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationItem.title = "综合报告"
        self.requestUrl = Settings.shared.h5BaseURL.absoluteString + "/camera-ipad-h5/pages/composite-report/composite-report"
        self.setupWebView()
        refresh()
    }


    private func setupWebView() {
        
        
        let configuration = WKWebViewConfiguration()
        configuration.userContentController = WKUserContentController()
        let preferences = WKPreferences()
//        preferences.javaScriptCanOpenWindowsAutomatically = true
////        preferences.minimumFontSize = 40.0
        configuration.preferences = preferences
        self.wkWebView = WKWebView(frame: CGRect.zero, configuration: configuration)
        self.wkWebView.uiDelegate = self
        self.wkWebView.allowsBackForwardNavigationGestures = false
        self.wkWebView.navigationDelegate = self
        self.view.addSubview(self.wkWebView)
        self.wkWebView.snp.makeConstraints { (make) in
            make.edges.equalToSuperview()
        }
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.navigationController?.setNavigationBarHidden(false, animated: true)
        self.wkWebView!.configuration.userContentController.add(self, name: "reportPrint")
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.wkWebView?.configuration.userContentController.removeScriptMessageHandler(forName: "reportPrint")
    }
    

    private func refresh() {
        if token == nil {
            if let tk = UserWrapModel.shared?.access_token {
                token = tk
                requestUrl += "?token=\(tk)&reportId=\(reportId!)&cusId=\(cusId!)"
                let urlRequest = URLRequest(url:URL(string:self.requestUrl)!, cachePolicy: .reloadIgnoringLocalCacheData)
                wkWebView?.load(urlRequest)
            }
        }
        else {
            if let tk = UserWrapModel.shared?.access_token {
                if token != tk {
                    token = tk
                    requestUrl += "?token=\(tk)&reportId=\(reportId!)&cusId=\(cusId!)"
                    let urlRequest = URLRequest(url:URL(string:self.requestUrl)!, cachePolicy: .reloadIgnoringLocalCacheData)
                    wkWebView?.load(urlRequest)
                }
            }
        }
    }
    
    
    @objc
    private func screenshotBarButtonItemPressed() {
        /*
        crVC?.collectionView.screenshot(scale: 1.0, completion: { [self] (image) in
            if let i = image {
                UIImageWriteToSavedPhotosAlbum(i, self, #selector(image(_:didFinishSavingWithError:contextInfo:)), nil)
            }
        })
         */
    }
    
    @objc
    private func printBarButtonItemPressed() {
        self.wkWebView.evaluateJavaScript("reportPrint()") { (data, error) in
            printLog(data)
        }
    }
}


extension GeneralReportViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        printBarButtonItem = UIBarButtonItem(image: UIImage(named: "ic_dayin"), style: UIBarButtonItem.Style.plain, target: self, action: #selector(printBarButtonItemPressed))
        screenshotBarButtonItem = UIBarButtonItem(image: UIImage(named: "ic_dangan_img"), style: UIBarButtonItem.Style.plain, target: self, action: #selector(screenshotBarButtonItemPressed))
        navigationItem.rightBarButtonItems = [printBarButtonItem, screenshotBarButtonItem]
        
    }
    

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {

    }
}


extension GeneralReportViewController: WKUIDelegate {

}


extension GeneralReportViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        /*
         if let messageBody = message.body as? [String:Any]
                 {
                     let message = messageBody["message"]
                     print(message!)
                 }
         */
        let params = message.body as! Dictionary<String, Any>
        switch message.name {
        case "reportPrint":
            break
        default:
            break
        }
    }
}
