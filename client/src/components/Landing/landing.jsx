import React from 'react';
import Head from 'next/head'; // import next/head
import Image from 'next/image'; // import next/image
import Link from 'next/link';

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Smart Health Monitoring Wristwatch</title>
        <link rel="stylesheet" href="https://unpkg.com/tailwindcss@next/dist/tailwind.min.css" />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700"
          rel="stylesheet"
        />
      </Head>
      <div className="text-gray-700 bg-white" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
        {/* Nav */}
        <nav>
          <div className="container mx-auto px-6 py-2 flex justify-between items-center">
            <a className="font-bold text-6xl lg:text-10xl" href="#">
              思渝AI - ChatGpt中国
            </a>
            <div className="block lg:hidden">
              <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none">
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
            <div className="hidden lg:block">
              <ul className="inline-flex">
                <li>
                  <a className="px-4 font-bold" href="/">
                    主页
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Hero */}
        <div
          className="py-20"
          style={{
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
          }}
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-2 text-white">
              我们百分百还原了ChatGPT的全部功能，更融入了我们独特的创新特性！
            </h2>
            <h3 className="text-1.9xl mb-8 text-gray-200">
              欢迎来到思渝AI，我们为您带来了未来的AI对话技术，原汁原味的ChatGPT体验在此开启。
              不论你是科技爱好者，创业者，作家，或者是教育者，你都能在这里找到未知的惊喜和无限的可能。
            </h3>
            <Link href="/login">
              <button className="bg-white font-bold rounded-full mt-6 py-4 px-8 shadow-lg uppercase tracking-wider">
                开始免费试用
              </button>
            </Link>
          </div>
        </div>
        {/* Features */}
        <section className="container mx-auto px-6 p-10">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            驾驭未来的AI对话 - 享受最纯粹的ChatGPT体验
          </h2>
          <div className="flex items-center flex-wrap mb-20">
            <div className="w-full md:w-1/2">
              <h4 className="text-3xl text-gray-800 font-bold mb-3">实时交互, 代码生成</h4>
              <p className="text-gray-600 mb-8">
                支持SSE实时返回，快速、准确的响应让你的聊天体验更加流畅。
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <Image src="/assets/py.png" alt="py Image" width={1400} height={1000} />
            </div>
          </div>
          <div className="flex items-center flex-wrap mb-20">
            <div className="w-full md:w-1/2">
              <Image src="/assets/1000.png" alt="Edu Image" width={1400} height={1000} />
            </div>
            <div className="w-full md:w-1/2 pl-10">
              <h4 className="text-3xl text-gray-800 font-bold mb-3">无字数限制</h4>
              <p className="text-gray-600 mb-8">
                我们支持最大字数的输入，保证你的每一次对话都能尽情畅谈。
              </p>
            </div>
          </div>
          <div className="flex items-center flex-wrap mb-20">
            <div className="w-full md:w-1/2">
              <h4 className="text-3xl text-gray-800 font-bold mb-3">保存聊天记录</h4>
              <p className="text-gray-600 mb-8">
                多种方式保存聊天记录，随时随地复习和查看，让每一次的学习和交流都能留下痕迹。
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <Image src="/assets/save.png" alt="Save Image" width={1400} height={1000} />
            </div>
          </div>
          <div className="flex items-center flex-wrap mb-20">
            <div className="w-full md:w-1/2">
              <Image src="/assets/secure.jpeg" alt="se Image" width={1400} height={1000} />
            </div>
            <div className="w-full md:w-1/2 pl-10">
              <h4 className="text-3xl text-gray-800 font-bold mb-3">保护隐私，安全无忧</h4>
              <p className="text-gray-600 mb-8">
                最安全的中文ChatGPT体验。用户密码加密：您的密码对我们来说是个秘密。我们采用最新的加密技术，确保您的密码安全存储，无人能破解。网站SSL加密：我们的网站使用SSL证书进行加密，确保所有传输的数据都是安全的，防止第三方截取和篡改。
              </p>
            </div>
          </div>
        </section>
        {/* Testimonials */}
        <section className="bg-gray-100">
          <div className="container mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
              海外ChatGpt用户体验
            </h2>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">
                    作为一名写作爱好者，ChatGPT软件让我感觉像是找到了我的创作伙伴。我可以随时向它询问关于情节设定、角色塑造的建议，甚至在我遇到写作瓶颈时，它都能提供我意想不到的灵感。这款软件非常理解我，让我的写作过程更加顺畅，更加愉快。
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">John Doe</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">
                    我是一位自由软件开发者，自从开始使用ChatGPT软件后，我的工作效率大大提升。我可以向它询问关于代码调试、最新编程技术的问题，它总能给出准确且深入的答复。此外，它还能帮我自动写出高质量的代码，这真的是每一个程序员的梦想！
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">Jane Doe</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">
                    作为一名语言教师，ChatGPT软件是个极好的教学辅助工具。它能用各种语言进行流畅对话，帮助学生实践语言运用。同时，它还能给出准确的词汇解释和句子翻译，极大地丰富了我的教学资源。用了这款软件后，我的教学效果大为提升。
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">James Doe</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Call to Action */}
        <section style={{ backgroundColor: '#667eea' }}>
          <div className="container mx-auto px-6 text-center py-20">
            <h2 className="mb-6 text-4xl font-bold text-center text-white">暂时只开放有限的用户</h2>
            <h3 className="my-4 text-2xl text-white">
              抢先注册，抢先获取思渝AI ChatGPT软件的最新功能，独家预览！
            </h3>
            <Link href="/login">
              <button className="bg-white font-bold rounded-full mt-6 py-4 px-8 shadow-lg uppercase tracking-wider">
                开始免费试用
              </button>
            </Link>
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-gray-100">
          <div className="container mx-auto px-6 pt-10 pb-6">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/4 text-center md:text-left">
                <h5 className="uppercase mb-6 font-bold">关于我们</h5>
                <ul className="mb-4">
                  <li className="mt-2">
                    <a href="#" className="hover:underline text-gray-600 hover:text-orange-500">
                      我们的团队，源自硅谷，致力于以先进的AI技术服务中国人群。在思渝AI，我们希望每个人都能享受到最优质的AI产品，因此我们不断思索、改变，以提供卓越的AI体验。加入思渝AI，与我们一同踏上这段激动人心的AI之旅！
                    </a>
                  </li>
                  <li className="mt-2">
                    <a href="#" className="hover:underline text-gray-600 hover:text-orange-500">
                      © 2023 by 思渝AI.
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
