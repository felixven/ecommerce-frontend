import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";

const Contact = () => {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center"
            style={{ backgroundImage: "url('')" }}>

            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-4xl font-bold text-center mb-6">—— 聯繫客服 ——</h1>
                <p className="text-gray-600 text-center mb-4">
                    Flex-Shop 重視您的意見！<br />
                    若有任何問題，歡迎留言或在上班時間來電聯繫客服人員。<br />
                    期待能為您服務！
                </p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            稱呼
                        </label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500" />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            信箱
                        </label>
                        <input
                            type="email"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            留言內容
                        </label>
                        <textarea
                            rows="4"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500" />
                    </div>

                    <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300">
                        送出
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <h2 className="text-lg font-semibold">聯絡資訊</h2>
                    <div className="flex flex-col items-center space-y-2 mt-4">
                        <div className="flex items-center">
                            <FaPhone className="text-gray-800 mr-2" />
                            <span className="text-gray-600">04 - 2688 3398</span>
                        </div>

                        <div className="flex items-center">
                            <FaEnvelope className="text-gray-800 mr-2" />
                            <span className="text-gray-600">flexshop@gmail.com</span>
                        </div>

                        <div className="flex items-center">
                            <FaMapMarkedAlt className="text-gray-800 mr-2" />
                            <span className="text-gray-600">台中市西屯區芙勒斯路77號</span>
                        </div>

                          <div className="flex items-center">
                            <MdAccessTimeFilled className="text-gray-800 mr-2" />
                            <span className="text-gray-600">服務時間：0900 - 1800</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Contact;