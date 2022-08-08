<template>
  <!-- <el-container class="wrapper">
    <el-main>
      <el-carousel :interval="4000" type="card" height="600px" weight="100%">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <el-button type="info" @click="toLogin">Info</el-button>
    </el-main>
  </el-container> -->
  <section
    class="hero-area"
    style="background-image: url('../../src/assets/css/images/bg.jpg')"
  >
    <div id="bg"></div>
    <div id="overlay"></div>
    <!-- <video autoplay muted loop class="hero-video">
		<source src="images/banner/hero-video.mp4" type="video/mp4">
	</video> -->
    <div id="main">
      <header id="header" margin-top="-50px">
        <div class="right">
          <img src="..\assets\iconmiaomiao.png" @click="toLogin" />
        </div>
        <h1 color="white">MO SHU</h1>
        <p color="white">
          团队协作 &nbsp;&bull;&nbsp; 释放创意 &nbsp;&bull;&nbsp; 及时高效
        </p>
        <el-button type="info" @click="toLogin" id="btn1">立即试用</el-button>
        <div height="100px"></div>
      </header>
    </div>
  </section>

  <!--
		Start About Section
		==================================== -->
  <section class="bg-one about section">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <!-- section title -->
          <div class="title text-center wow fadeIn" data-wow-duration="1500ms">
            <h2 style="color: #57cbcc">About <span class="color">Us</span></h2>
            <div class="border"></div>
          </div>
          <!-- /section title -->
        </div>

        <!-- About item -->
        <div
          class="col-md-4 text-center wow fadeInUp"
          data-wow-duration="500ms"
        >
          <div class="block">
            <div class="icon-box">
              <i class="tf-tools"></i>
            </div>
            <!-- Express About Yourself -->
            <div class="content text-center">
              <h3 class="wenzititle">随时创作</h3>
              <p class="wenzi">
                不受场地限制 不管在家或是公司 或者咖啡店、车站
                ，只要有网，就能开启创作
              </p>
            </div>
          </div>
        </div>
        <!-- End About item -->

        <!-- About item -->
        <div
          class="col-md-4 text-center wow fadeInUp"
          data-wow-duration="500ms"
          data-wow-delay="250ms"
        >
          <div class="block">
            <div class="icon-box">
              <i class="tf-strategy"></i>
            </div>
            <!-- Express About Yourself -->
            <div class="content text-center">
              <h3 class="wenzititle">专业易用</h3>
              <p class="wenzi">
                简洁易懂的界面，丰富的素材，人人可上手，助力快速完成产品设计
              </p>
            </div>
          </div>
        </div>
        <!-- End About item -->

        <!-- About item -->
        <div
          class="col-md-4 text-center wow fadeInUp"
          data-wow-duration="500ms"
          data-wow-delay="500ms"
        >
          <div class="block kill-margin-bottom">
            <div class="icon-box">
              <i class="tf-anchor2"></i>
            </div>
            <!-- Express About Yourself -->
            <div class="content text-center">
              <h3 class="wenzititle">便捷协作</h3>
              <p class="wenzi">
                云端编辑，实时协作，分享交付，一站完成工作沟通，让团队管理流畅运作
              </p>
            </div>
          </div>
        </div>
        <!-- End About item -->
      </div>
      <!-- End row -->
    </div>
    <!-- End container -->
  </section>
  <!-- End section -->

  <section class="section about-2 padding-0 bg-two" id="about">
    <div class="container-fluid p-0">
      <div class="row no-gutters align-items-center">
        <div class="col-lg-6">
          <img class="img-fluid" src="../assets/css/images/about2.jpg" alt="" />
        </div>
        <div class="col-lg-6">
          <div class="content-block">
            <h2 class="wenzititle">随时享受创作与合作的乐趣</h2>

            <p class="wenzi">试试把你的想法告诉所有人</p>
            <div class="row">
              <div class="col-md-6">
                <div class="media">
                  <div class="pull-left">
                    <i class="tf-circle-compass"></i>
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading">多人实时协作实现团队内容共创</h4>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Possimus consectetur dolores repellendus eos saepe
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="media">
                  <div class="pull-left">
                    <i class="tf-hotairballoon"></i>
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading">便捷团队管理提高工作效率</h4>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Possimus consectetur dolores repellendus
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!--
Start Call To Action
==================================== -->
  <section class="call-to-action section-sm bg-1 overly">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h2 class="wenzititle" style="color: white">创意设计 & 便捷特性</h2>
          <p style="color: white">
            想立刻开启高效协作，创建属于自己的团队？ <br />
            选择墨书，拉齐彼此的能量通道
          </p>
          <a href="contact.html" class="btn btn-main" style="font-weight: bold"
            >立刻试用</a
          >
        </div>
      </div>
      <!-- End row -->
    </div>
    <!-- End container -->
  </section>
  <!-- End section -->

  <!-- Start Services Section
==================================== -->
  <section id="services" class="bg-one section">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <!-- section title -->
          <div class="title text-center wow fadeIn" data-wow-duration="500ms">
            <h2 style="color: #57cbcc">
              Our <span class="color">Services</span>
            </h2>
            <div class="border"></div>
          </div>
          <!-- /section title -->
        </div>

        <!-- Single Service Item -->
        <article
          class="col-lg-4 col-md-6 wow fadeInUp"
          data-wow-duration="500ms"
        >
          <div class="service-block text-center">
            <div class="service-icon text-center">
              <i class="tf-globe"></i>
            </div>
            <h3>轻松上手</h3>
            <p>简洁易懂的界面，丰富的素材，人人可上手，助力快速完成产品设计</p>
          </div>
        </article>
        <!-- End Single Service Item -->

        <!-- Single Service Item -->
        <article
          class="col-lg-4 col-md-6 wow fadeInUp"
          data-wow-duration="500ms"
          data-wow-delay="200ms"
        >
          <div class="service-block text-center">
            <div class="service-icon text-center">
              <i class="tf-ion-laptop"></i>
            </div>
            <h3>快速迭代</h3>
            <p>轻松版本管理，采用高效工作协同，加快产品迭代周期和效益</p>
          </div>
        </article>
        <!-- End Single Service Item -->

        <!-- Single Service Item -->
        <article
          class="col-lg-4 col-md-6 wow fadeInUp"
          data-wow-duration="500ms"
          data-wow-delay="400ms"
        >
          <div class="service-block text-center">
            <div class="service-icon text-center">
              <i class="tf-genius"></i>
            </div>
            <h3>Media &amp; Advertisement</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur.. Sed id lorem eget orci
              dictum facilisis vel id tellus. Nullam iaculis arcu at mauris
              dapibus consectetur.
            </p>
          </div>
        </article>
        <!-- End Single Service Item -->

        <!-- Single Service Item -->
        <article
          class="col-lg-4 col-md-6 wow fadeInUp"
          data-wow-duration="500ms"
          data-wow-delay="200ms"
        >
          <div class="service-block text-center">
            <div class="service-icon text-center">
              <i class="tf-dial"></i>
            </div>
            <h3>Graphic Design</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur.. Sed id lorem eget orci
              dictum facilisis vel id tellus. Nullam iaculis arcu at mauris
              dapibus consectetur.
            </p>
          </div>
        </article>
        <!-- End Single Service Item -->

        <!-- Single Service Item -->
        <article
          class="col-lg-4 col-md-6 wow fadeInUp"
          data-wow-duration="500ms"
          data-wow-delay="400ms"
        >
          <div class="service-block text-center">
            <div class="service-icon text-center">
              <i class="tf-target3"></i>
            </div>
            <h3>Apps Development</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur.. Sed id lorem eget orci
              dictum facilisis vel id tellus. Nullam iaculis arcu at mauris
              dapibus consectetur.
            </p>
          </div>
        </article>
        <!-- End Single Service Item -->

        <!-- Single Service Item -->
        <article
          class="col-lg-4 col-md-6 wow fadeInUp"
          data-wow-duration="500ms"
          data-wow-delay="600ms"
        >
          <div class="service-block text-center kill-margin-bottom">
            <div class="service-icon text-center">
              <i class="tf-lifesaver"></i>
            </div>
            <h3>Networking</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur.. Sed id lorem eget orci
              dictum facilisis vel id tellus. Nullam iaculis arcu at mauris
              dapibus consectetur.
            </p>
          </div>
        </article>
        <!-- End Single Service Item -->
      </div>
      <!-- End row -->
    </div>
    <!-- End container -->
  </section>
  <!-- End section -->
  <!-- 
Start Our Team
=========================================== -->

  <section id="our-team" class="section bg-two">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <!-- section title -->
          <div class="title text-center wow fadeInUp" data-wow-duration="500ms">
            <h2>Our <span class="color">Team</span></h2>
            <div class="border"></div>
          </div>
          <!-- /section title -->
        </div>

        <!-- team member -->
        <div class="col-lg-3 col-md-6 wow fadeIn" data-wow-duration="500ms">
          <div class="team-member">
            <div class="member-photo">
              <!-- member photo -->
              <img
                class="img-fluid"
                src="../assets/css/images/team/team-1.jpg"
                alt="Meghna"
              />
              <!-- /member photo -->

              <!-- member social profile -->
              <div class="mask">
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <a href="#"><i class="tf-ion-social-facebook"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#"><i class="tf-ion-social-twitter"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#"><i class="tf-ion-social-linkedin"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#"
                      ><i class="tf-ion-social-dribbble-outline"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <!-- /member social profile -->
            </div>

            <!-- member name & designation -->
            <div class="member-meta">
              <h4 class="h5">xuhang</h4>

              <p>相信的心就是你的魔法</p>
            </div>
            <!-- /member name & designation -->
            <!-- /about member -->
          </div>
        </div>
        <!-- end team member -->

        <!-- team member -->
        <div
          class="col-lg-3 col-md-6 wow fadeIn"
          data-wow-duration="500ms"
          data-wow-delay="200ms"
        >
          <div class="team-member">
            <div class="member-photo">
              <!-- member photo -->
              <img
                class="img-fluid"
                src="../assets/css/images/team/team-2.jpg"
                alt="Meghna"
              />
              <!-- /member photo -->

              <!-- member social profile -->
              <div class="mask">
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <a href="#"><i class="tf-ion-social-facebook"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#"><i class="tf-ion-social-twitter"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#"><i class="tf-ion-social-linkedin"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#"
                      ><i class="tf-ion-social-dribbble-outline"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <!-- /member social profile -->
            </div>

            <!-- member name & designation -->
            <div class="member-meta">
              <h4 class="h5">wangyuqi</h4>

              <p>这里还不知道写什么</p>
            </div>
            <!-- /member name & designation -->
            <!-- /about member -->
          </div>
        </div>
        <!-- end team member -->

        <!-- team member -->
        <div
          class="col-lg-3 col-md-6 wow fadeIn"
          data-wow-duration="500ms"
          data-wow-delay="400ms"
        >
          <div class="team-member">
            <div class="member-photo">
              <!-- member photo -->
              <img
                class="img-fluid"
                src="../assets/css/images/team/team-3.jpg"
                alt="Meghna"
              />
              <!-- /member photo -->

              <!-- member social profile -->
              <div class="mask">
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <a href="#"><i class="tf-ion-social-facebook"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#"><i class="tf-ion-social-twitter"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#"><i class="tf-ion-social-linkedin"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#"
                      ><i class="tf-ion-social-dribbble-outline"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <!-- /member social profile -->
            </div>

            <!-- member name & designation -->
            <div class="member-meta">
              <h4 class="h5">hujuncheng</h4>

              <p>这里还不知道写什么</p>
            </div>
            <!-- /member name & designation -->
            <!-- /about member -->
          </div>
        </div>
        <!-- end team member -->

        <!-- team member -->
        <div
          class="col-lg-3 col-md-6 wow fadeIn"
          data-wow-duration="500ms"
          data-wow-delay="600ms"
        >
          <div class="team-member">
            <div class="member-photo">
              <!-- member photo -->
              <img
                class="img-fluid"
                src="../assets/css/images/team/team-4.jpg"
                alt="Meghna"
              />
              <!-- /member photo -->

              <!-- member social profile -->
              <div class="mask">
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <a href="#"><i class="tf-ion-social-facebook"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#"><i class="tf-ion-social-twitter"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#"><i class="tf-ion-social-linkedin"></i></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#"
                      ><i class="tf-ion-social-dribbble-outline"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <!-- /member social profile -->
            </div>

            <!-- member name & designation -->
            <div class="member-meta">
              <h4 class="h5">fenghaoran</h4>
              <p>这里还不知道写什么。</p>
            </div>
            <!-- /member name & designation -->
            <!-- /about member -->
          </div>
        </div>
        <!-- end team member -->
      </div>
      <!-- End row -->
    </div>
    <!-- End container -->
  </section>
  <!-- End section -->
</template>

<script setup>
import Header from "../components/common/Header.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const toLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
#btn1 {
  padding: 12px 50px;
  color: white;
  border: 2px solid #cfe1f7;
  background: none;
  opacity: 0.8;
  text-align: center;
  height: 50px;
  border-radius: 30px;
  margin-top: 40px;
  transition: 0.3s linear;
  width: 14%;
  font-weight: 550;
  font-size: 20px;
}

.title {
  opacity: 1;
}
#btn1:hover {
  background: #063273;
  color: #f2f2f2;
}
.wrapper {
  background-color: #f8fefc;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  backdrop-filter: blur(20px);
  transition: 0.3s;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background: url("../assets/teamcreate.jpg");
  background-size: cover;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.wenzi {
  font-weight: 550;
  color: #333333;
}

.wenzititle {
  font-weight: bold;
  color: black;
}
</style>

<style src="../../src/assets/css/main.css" scoped></style>
<style src="../../src/assets/plugins/themefisher-font/style.css" scoped></style>
<style
  src="../../src/assets/plugins/bootstrap/bootstrap.min.css"
  scoped
></style>
<style src="../../src/assets/plugins/animate-css/animate.css" scoped></style>
<style
  src="../../src/assets/plugins/magnific-popup/dist1/magnific-popup.css"
  scoped
></style>
<style src="../../src/assets/plugins/slick-carousel/slick.css" scoped></style>
<style
  src="../../src/assets/plugins/slick-carousel/slick-theme.css"
  scoped
></style>

<style src="../../src/assets/css/style.css" scoped></style>
