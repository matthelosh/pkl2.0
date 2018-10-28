<template lang="pug">
  div
    v-layout
        v-flex(xs3)
            h2 Dokumen Prakerlap
        v-flex(xs3 )
            v-select(
                append-icon="fa fa-angle-down"
                v-bind:items="dudis"
                v-model="selDudi"
                label="Pilih Dudis"
                single-line
                item-text="namaDudi"
                item-value="_id"
                return-object
                :hint="`${selDudi.namaDudi}, ${selDudi._id}`"
                persistent-hint
                input="selDudi._id"
                @change="getSiswas"
                )
        v-flex(xs2 offset-xs1)
            v-select(
                append-icon="fa fa-angle-down"
                v-bind:items="items"
                v-model="select"
                label="Select"
                single-line
                item-text="text"
                item-value="val"
                return-object
                :hint="`${select.text}, ${select.val}`"
                persistent-hint
                scrollable
                )
        v-flex(xs1 offset-xs1)
            //- v-btn(color="success" @click.stop="getMonKe")
            //-     i.fa.fa-search
            <v-btn fab depressed fixed right color="info" @click.stop="print(select.val)" v-if="select.val == 'form_nilai' || select.val == 'monitoring' || select.val == 'permohonan' || select.val == 'srt_antar' || select.val == 'ba_antar' || select.val == 'lamp_permohonan'"><i class="fa fa-print"></i></v-btn>
            //- <v-btn color="info" @click.stop="cetak" v-if="select.val == 'form_nilai' || select.val == 'monitoring' || select.val == 'permohonan' || select.val == 'srt_antar' || select.val == 'ba_antar' || select.val == 'lamp_permohonan'"><i class="fa fa-print"></i> Cetak</v-btn>

    br
    .sheet#blangkoNilai.form_nilai(v-if="select.val == 'form_nilai'")
        form-nilai(:dudi="selDudi" 
        :siswas="siswas")
    .sheet#formJemput.ba_jemput(v-if="select.val == ba_jemput")
        form-jemput
    .sheet#default(v-if="select.val == 'default'")
        h2 Data Dudi Saya.
        v-layout(row wrap)
            v-flex(xs3 v-for="dudi in dudist" 
                :key="dudi._id")
                v-container(grid-md-column)
                    v-card(style="border:1px solid teal")
                        v-card-title
                            h3 {{dudi.namaDudi}}
                        v-card-text
                            p Kode Dudi: {{dudi._id}}
                            p Alamat: {{dudi.alamat}}
                            p Pemilik: {{dudi.pemilik}}
                            p No. Telp/HP: {{dudi.telp}}
        

    .sheet#mohon.permohonan.srt_antar.ba_antar(v-if="select.val == 'permohonan' || select.val == 'srt_antar' || select.val == 'ba_antar'" )
        div.lembar.print
            article#srt_permohonan(xs8 offset-xs2)
                v-layout.kop(row)
                    v-flex(xs1)
                        .logo
                            img.logo-surat(src='/public/img/jatim.jpg' width="50px")
                    v-flex.text-xs-center(xs11)
                        h3 PEMERINTAH PROVINSI JAWA TIMUR
                        h3 DINAS PENDIDIKAN
                        h3 SEKOLAH MENENGAN KEJURUAN NEGERI 10
                        p Jl. Raya Tlogowaru Kec. Kedungkandang Telp. (0341) 754086 Fax. (0341) 754087
                        p Home Page: http://smkn10-mlg.sch.id Email: smk10_malang@yahoo.co.id
                        p.text-xs-right <span class="malang">MALANG</span>  <span class="kode-pos">Kode Pos.65133</span>
                hr.garis-kop
                v-layout.hal(row v-if="select.val == 'permohonan'")
                    v-flex.nmr(xs-6)
                        table()
                            tr
                                td(style="width:80px;") Nomor		
                                td : {{no_surat}}
                            tr
                                td(style="width:80px;") Lampiran
                                td : 1 Lembar
                            tr 
                                td(style="width:80px;") Perihal
                                td : Permohonan Praktek Kerja Lapangan
                        br
                    v-flex.tmpt(xs-3 offset-xs2)
                        p Malang {{tgl}}
                v-layout.hal(row v-if="select.val == 'permohonan'")
                    v-flex(xs12)
                        table
                            tr
                                td(style="width:80px;") Kepada Yth	
                                td : Pimpinan {{selDudi.namaDudi}}
                            tr
                                td Di Tempat
                    
                v-layout(v-if="select.val == 'srt_antar'" class="bg-success")
                    v-flex.text-xs-center(v-if="select.val == 'srt_antar'" class="bg-success")
                        h1(style="text-align:center; width: 100%;").text-xs-center <u>S U R A T  &nbsp; T U G A S</u>
                        h5 NOMOR : 800/{{no}}/101.6.10.20/XII/2017
                v-layout(v-if="select.val == 'ba_antar'")
                    v-flex.text-xs-center
                        br
                        h4 BERITA ACARA PENGANTARAN <br> SISWA PRAKTEK KERJA LAPANGAN

                v-layout.isi(row)
                    v-flex.text-xs-justify(v-if="select.val == 'ba_antar'")
                        p Sehubungan dengan dimulainya Praktek Kerja Lapangan (Prakerlap) SMK Negeri 10 Malang ke {{tahap[0]}} tahap {{tahap[1]}} yang dilaksanakan mulai {{pelaksanaan}}, maka pada hari ini, ........................,  tanggal ........................ bulan ........................   tahun ........................ dilakukan pengantaran siswa Prakerlap oleh guru pembimbing SMK Negeri 10 Malang ke:
                        table#tbl_mohon(style="margin-left: 50px; width: 75%")
                            tr
                                td Nama Du/Di
                                td : {{selDudi.namaDudi}}
                            tr
                                td Alamat
                                td(style="word-wrap: break-word") : {{selDudi.alamat}}
                            tr
                                td No. Telepon
                                td : {{selDudi.telp}}
                            tr
                                td(colspan="2")
                                    br
                            tr
                                td(colspan="2") Dengan  data  siswa peserta Prakerlap sebagai berikut :  
                        //- br
                        table#tbl_ba_antar_siswa(border="1" style="border-collapse: collapse; margin: auto;")
                            thead
                                tr
                                    th(style="padding: 5px 10px;") NO
                                    th(style="padding: 5px 10px;") Nama
                                    th(style="padding: 5px 10px;") NIS
                                    th(style="padding: 5px 10px;") No. HP / Telepon
                                    th(style="padding: 5px 10px;") Kempetensi Keahlian
                            tbody
                                tr(v-for="(siswa, index) in siswaterpilih")
                                    td(style="padding: 5px 10px; font-size: 10pt; text-align: left;") {{index+1}}
                                    td(style="padding: 5px 10px; font-size: 10pt; text-align: left;") {{siswa.nama_siswa}}
                                    td(style="padding: 5px 10px; font-size: 10pt; text-align: left;") {{siswa.nis}}
                                    td(style="padding: 5px 10px; font-size: 10pt; text-align: left;") {{siswa.nis}} 
                                    td(style="padding: 5px 10px; font-size: 10pt; text-align: left;") {{siswa.kelas}}
                        br
                        table(style="margin-left: 50px")
                            tr
                                td Nama Guru Pembimbing
                                td : {{guru.name}}
                            tr
                                td No. Telepon / HP
                                td : {{guru.hp}}
                        br
                        p Demikian berita acara ini dibuat dengan sebenarnya, atas kerja sama dan bimbingannya diucapkan banyak terima kasih.
                    v-flex.text-xs-justify(xs12 v-if="select.val == 'permohonan'")
                        p Dalam rangka melaksanakan Kebijakan Pemerintah tentang program Pendidikan Sistem Ganda (PSG) untuk siswa SMK maka setiap siswa SMK Negeri 10 Malang diwajibkan untuk melaksanakan magang/bekerja di Industri atau dunia usaha dalam jangka waktu tertentu. Program magang tersebut disebut dengan istilah Praktik Kerja Lapangan (Prakerlap) dan dilaksanakan dengan ketentuan sebagai berikut:
                        ol(style="margin-left:50px;")
                            li Waktu pelaksanaan Praktek Kerja Lapangan (Prakerlap) mulai 1 Juli 2018 s/d  30 Desember 2018.
                            li Jam kerja Prakerlap selama 6 sampai 8 jam setiap hari dan berakhir paling lambat pada jam 17.00 WIB / sesuai shift

                        p Sehubungan dengan hal tersebut, kami mohon agar Bapak/Ibu berkenan memberikan ijin dan kesempatan pada siswa kami  di bawah ini untuk melaksanakan Prakerlap di tempat kerja Bapak/Ibu.
                            table#tbl_permohonan(border="1" style="border-collapse: collapse;")
                                thead
                                    tr
                                        th(style="text-indent: 0!important; padding: 5px") NO
                                        th(style="text-indent: 0!important; padding: 5px") Nama
                                        th(style="text-indent: 0!important; padding: 5px") NIS
                                        th(style="text-indent: 0!important; padding: 5px") Kelas
                                tbody
                                    tr(v-for="(siswa, index) in siswaterpilih")
                                        td(style="text-indent: 0!important; padding: 5px") {{index+1}}
                                        td(style="text-indent: 0!important; padding: 5px") {{siswa.nama_siswa}}
                                        td(style="text-indent: 0!important; padding: 5px") {{siswa.nis}}
                                        td(style="text-indent: 0!important; padding: 5px") {{siswa.kelas}}

                        p Selanjutnya kami mohon agar Bapak/Ibu berkenan memberikan jawaban diterima atau tidak diterima atas permohonan kami, melalui lembar balasan (terlampir).

                        p Demikian permohonan kami, atas perhatian dan kerjasamanya disampaikan banyak terima kasih.
                    v-flex#isi_srt_antar.text-xs-justify(xs10 offset-xs1 v-if="select.val == 'srt_antar'")
                        table
                            tr
                                td(colspan="2") Yang bertanda tangan di bawah ini :
                            tr
                                td Nama 
                                td : Dwidjo Lelono, S.Pd., MM.Pd.
                            tr
                                td NIP 
                                td : 19670220 199103 1 008
                            tr
                                td Jabatan
                                td : Kepala Sekolah 
                            tr
                                td(colspan="2")
                                    br
                            tr 
                                td Dengan ini menugaskan kepada:
                            tr
                                td  Nama 
                                td : {{guru.name}}
                            tr 
                                td NIP
                                td : <span v-if="guru.nip == 'undefined'"> - </span>
                                    span(v-else) {{guru.nip}}
                            tr
                                td  Jabatan
                                td : Guru
                        br
                        p(style="text-indent:0!important") untuk melakukan pengantaran siswa peserta Praktek Kerja Lapangan (Prakerlap) angkatan {{tahap[0]}} tahap {{tahap[1]}} berikut ini:
                        table#tbl_antar_siswa(border="1" style="border-collapse:collapse; margin: 20px auto; min-width:50%; width:auto;")
                            thead
                                tr
                                    th No
                                    th NIS
                                    th Nama
                                    th Kelas
                            tbody
                                tr(v-for="(siswa, index) in siswaterpilih")
                                    td {{index+1}}
                                    td {{siswa.nis}}
                                    td {{siswa.nama_siswa}}
                                    td {{siswa.kelas}}
                        table
                            tr
                                td pada:
                            tr
                                td Hari/Tanggal
                                td : {{tanggal}}
                            tr 
                                td Pukul
                                td : 08.00 WIB
                            tr 
                                td Tempat
                                td : {{selDudi.namaDudi}}
                        br
                        p(style="text-indent:0!important; ") Demikian surat tugas ini dibuat untuk dilaksanakan sebaik-baiknya dan dengan penuh tanggung jawab.
        
                        br
                        br
                v-layout.ttd(row)
                    v-flex.note(xs8 v-if="select.val == 'permohonan' || select.val == 'srt_antar'")
                        div(v-if="select.val == 'permohonan'")
                            p Catatan:
                            p Narahubung Prakerlap SMKN 10 Malang:
                            ul 
                                li KepalaProgram Keahlian Teknik Komputer dan Informatika
                                    | <br> &nbsp; Nanang Wahyudianto, S.Kom – 085646630057
                                li Ketua Prakerlap
                                    | <br> &nbsp; Luki Emiliya HIdayat, M.Pd - 085755508846
                    v-flex.td(xs4 v-if="select.val == 'permohonan' || select.val == 'srt_antar'")
                        p <strong> Kepala Sekolah</strong>,
                        br
                        br
                        br
                        p <strong><u> Dwidjo Lelono, S.Pd, MM.Pd</u></strong>
                        p Pembina Tk. I 
                        p NIP. 19670220 199103 1 008

                    v-flex.ttd-ba_antar(xs8 v-if="select.val == 'ba_antar'")
                        p &nbsp;
                        p Pembimbing Prakerlap
                        br
                        br
                        br
                        br
                        p <strong><u>{{guru.name}}</u></strong>
                        p NIP. {{guru.nip}}
                    v-flex.ttd-ba_antar(xs4 v-if="select.val == 'ba_antar'")
                        p Malang, ............................... 2018
                        p Pimpinan Du/Di
                        br
                        br
                        br
                        br
                        p ..............................................................


        v-layout.kaki(row v-if="select.val !== 'ba_antar'")
            //- v-flex(xs6)
            p.foot-p Teknik Kendaraan Ringan, Teknik Ototronika, Teknik dan Bisnis Sepeda Motor, Teknik Komputer dan Jaringan, Multimedia
            .foot-img(style="display: flex; justify-content:center;")
                img(src="/public/img/ahm.png" height="30")
                img(src="/public/img/10.jpg" height="30")
                img(src="/public/img/kan.png" height="30")
                img(src="/public/img/honda.png" height="30")
                    //- v-flex(xs6)
                    //-     .foot-logo.text-xs-center
                    //-         img(src="/public/img/ahm.png" height="30")
                    //-         img(src="/public/img/10.jpg" height="30")
                    //-         img(src="/public/img/kan.png" height="30")
                    //-         img(src="/public/img/honda.png" height="30")
        v-layout.kaki(row v-if="select.val == 'ba_antar'")
            v-flex(xs12)
                h6 No. Dokumen : Humas-CM-7.5-4-15-rev-0
            //- br(v-if="select.val == 'permohonan' || select.val == 'srt_antar'")
            //- br(v-if="select.val == 'permohonan' || select.val == 'srt_antar'")
            //- br(v-if="select.val == 'permohonan' || select.val == 'srt_antar'")
            //- br(v-if="select.val == 'permohonan' || select.val == 'srt_antar'")
            //- br(v-if="select.val == 'permohonan' || select.val == 'srt_antar'")
            //- br(v-if="select.val == 'permohonan' || select.val == 'srt_antar'")
            //- br(v-if="select.val == 'permohonan' || select.val == 'srt_antar'")
            //- br(v-if="select.val == 'permohonan' || select.val == 'srt_antar'")
            //- div.page-spacer(v-if="select.val == 'permohonan' || select.val == 'srt_antar'")

            //- br(v-if="select.val == 'permohonan'")
            //- br(v-if="select.val == 'permohonan'")
            //- br(v-if="select.val == 'permohonan'")
            //- br(v-if="select.val == 'permohonan'")
            
    .sheet#lamp_mohon.lamp_permohonan(v-if="select.val == 'lamp_permohonan'")
        .lembar.print#lamp_permohonan
            //- .v-layout(row)
            v-flex(xs12)
                v-layout.hal.kop(row)
                    v-flex(xs1)
                        p No    
                        p Lamp
                        p Hal
                    v-flex(xs11)
                        p : ............................
                        p : ............................
                        p : Keterangan kesediaan diterima/tidak diterima Praktek Kerja Lapangan
                br
                v-layout.kop(row)
                    v-flex(xs10 offset-xs1)
                        p Kepada 
                        p Yth : Kepala SMK Negeri 10 Malang
                        p Jl.Raya Tlogowaru Kec. Kedungkandang
                        p di Malang	
                br
                div
                    table.tbl_owner_dudi
                        tr
                            td(colspan="2" )
                                | Yang bertanda tangan di bawah ini :
                        tr
                            td
                                | Nama
                            td
                                | : ........................................................
                        tr
                            td Jabatan
                            td : ........................................................
                        tr
                            td Nama perusahaan/instansi
                            td : ........................................................
                        tr
                            td Alamat perusahaan/instansi
                            td : ........................................................
                        tr
                            td Nomor telp
                            td : ........................................................
                    br
                    v-flex(xs10 offset-xs1)
                        p Sehubungan dengan permohonan Saudara tanggal ................................... tentang permohonan untuk Praktek Kerja Lapangan (Prakerlap), maka dengan ini kami memutuskan : (*menerima/tidak menerima) permohonan Saudara.
                        p Kami bisa menerima peserta Praktek Kerja Lapangandari SMK Negeri 10 Malang periode 1 Juli 2018 s/d  30 Desember 2018 sebanyak ___________________ siswa.

                        p Demikian surat keterangan ini agar dibuat sebagaimana mestinya.
                    br
                    br
                    br
                    br
                    v-flex(xs4 offset-xs8)
                        p ............., .......................... 2018
                        br
                        br
                        br
                        p(style="margin: 0!important;") ....................................................
                        p(style="font-size:8pt; margin: 0!important;") (Nama Terang &amp; Stempel)
                br
                br
                br
                br
                br
                br
                p.nb *) Coret yang tidak perlu

    .sheet#monitoring.monitoring(v-if="select.val == 'monitoring'")
        .lembar-monitoring
            v-layout.kop-m(row style="border-bottom: 5px double black;")
                v-flex(xs12)
                    .logo(style="")
                        img(src='/public/img/jatim.jpg' width="100px")
                    .kop-text.text-xs-center(style="padding-top: 10px; ")
                        h3 PEMERINTAH JAWA TIMUR
                        h3 DINAS PENDIDIKAN
                        h2 <strong>SEKOLAH MENENGAH KEJURUAN NEGERI 10 MALANG</strong>
                        p Jl. Raya Tlogowaru Kec. Kedungkandang Telp. (0341) 754086 Fax. (0341) 754087
                        p Home Page: http://smkn10-mlg.sch.id Email: smk10_malang@yahoo.co.id
                        p.text-xs-center <span class="malang">MALANG</span>  <span class="kode-pos">Kode Pos.65133</span>
            v-layout.title-m(row)
                v-flex(xs12)
                    h1.text-xs-center BERITA ACARA MONITORING PRAKERLAP ANGKATAN {{tahap[0]}} TAHAP {{tahap[1]}}
            v-layout.meta-m(row)
                v-flex(xs2)
                    p NAMA GURU <span class="no-print">PEMBIMBING</span>
                    p NAMA PERUSAHAAN <span class="no-print">(DU/DI)</span>
                    p JUMLAH PRAKTIKAN
                v-flex(xs6)
                    p : {{guru.name}}
                    p : {{selDudi.namaDudi}}
                    p : {{siswaterpilih.length}}
                v-flex(xs2)
                    p KOMPETENSI KEAHLIAN
                    p HARI/TANGGAL <span class="no-print">MONITORING</span>
                    p MONITORING KE
                v-flex(xs2)
                    p : {{progli}}
                    p : {{tanggal}}
                    p : 
                        span(v-if="monitoringKe < 1") Tidak ada agenda untuk saat ini.
                        span(v-else) {{monitoringKe[0].kegiatan}}
            v-layout.isi-m(row)
                v-flex(xs12)
                    table.tbl-siswa-m(border="1" style="border-collapse: collapse; width: 100%")
                        thead
                            tr
                                th(rowspan="2") No
                                th(rowspan="2") Nama Praktikan
                                th(colspan="3") Kehadiran
                                th(rowspan="2") Permasalahan
                                th(rowspan="2") Penyelesaian Permasalahan
                            tr
                                th S
                                th I
                                th A
                        tbody(v-for="(siswa, index) in siswaterpilih")
                            tr
                                td(style="padding: 5px; text-align: center") {{index+1}}
                                td(style="padding: 10px") {{siswa.nama_siswa}}
                                td(style="padding: 5px") 
                                td(style="padding: 5px") 
                                td(style="padding: 5px") 
                                td(style="padding: 5px") 
                                td(style="padding: 5px") 
            br
            v-layout.ttd-m(row)
                v-flex.text-xs-center(xs3)
                    p KETUA PRAKERLAP
                    br
                    br
                    br
                    p <strong><u>Luki Emiliya Hidayat, M.Pd</u></strong>
                    p.nip NIP. 19790219 200903 2 003
                v-flex.text-xs-center(xs3)
                    p KAPROGLI
                    br
                    br
                    br
                    p <strong><u>{{kaprog}}</u></strong>
                    p.nip NIP. {{nipKaprog}}
                v-flex.text-xs-center(xs3)
                    p PIMPINAN DU/DI
                    br
                    br
                    br
                    p <strong><u>.........................................</u></strong>
                    p.nip NIP. 
                v-flex.text-xs-center(xs3)
                    p GURU PEMBIMBING
                    br
                    br
                    br
                    p <strong><u>{{guru.name}}</u></strong>
                    p NIP. 
    <iframe name="print_frame" width="0" height="0" frameborder="0" src="about:blank"></iframe>
    v-snackbar(v-model="snack" color="red" top)
        h3 {{snackMsg}}
</template>
<script>
import axios from 'axios'
import FormNilai from '@pages/comps/FormNilai'
import FormJemput from '@pages/comps/FormJemput'
// import Penempatan from '@pages/comps/Penempatan'
// import Api from './../../lib/conf.js'
export default {
  components: {FormNilai, FormJemput},
  data () {
      return {
        snack: false,
        snackMsg: '',
        // angkatan: 'XI',
        // tahap: 'I',
        select: { text: 'Pilih Berkas', val: 'default' },
        items: [
            { text: 'Pilih Berkas', val: 'default' }, 
            { text: 'Monitoring', val: 'monitoring' },
            { text: 'Surat Permohonan', val: 'permohonan' },
            { text: 'Lamp. Surat Permohonan', val: 'lamp_permohonan' },
            { text: 'Surat Tugas Pengantaran', val: 'srt_antar' },
            { text: 'Berita Acara Pengantaran', val: 'ba_antar' },
            { text: 'Berita Acara Penjemputan', val: 'ba_jemput' },
            { text: 'Blangko Nilai', val: 'form_nilai' },
        ],
        selDudi: { namaDudi: 'Pilih Dudi', _id: 'default'},
        dudiItems: [

        ],
        jadwals: [],
        doc: 'default',
        token: sessionStorage.getItem('token'),
        no: '',
        no_surat: '',
        // guru: {
        //     nama: 'Fulan ibn Fulan ibn Fulan',
        //     nip: '12345',
        //     jabatan: 'Guru'
        // },
        siswas: [],
        dudis: [],
        server: this.$store.state.server,
        pkls:[]
      }
  },
    created(){
        // this.get_no();
        // this.getSiswas();
        this.getMyPkl();
        this.getJadwals();
    },
    methods : {
        print(berkas) {
            var berkasClass = document.getElementsByClassName(berkas);
            // alert(berkas)
            var page = berkasClass[0].outerHTML;
            var newWin = window.open("", "Cetak Berkas");
            var styleMonitoring =`
                @page{size:landscape;}
                body, html{
                    writing-mode: tb-lr;
                    margin: 0;
                    padding: 0;
                }
                #monitoring {
                    width: 100%;
                }
                .kop-m{
                    width: 100%;
                    position : relative;
                    padding-bottom: 10px;
                }
                .kop-m .logo{
                    width: 75px;
                    position : absolute;
                    left: 5%;
                }
                .kop-m h3, 
                .kop-m h2,
                .kop-m p{
                    margin: 0;
                }
                
                .title-m h1{
                    font-size: 1.5em;
                }
                .meta-m {
                    display: flex;
                    justify-content: space-around;
                }
                .meta-m p{
                    margin:0;
                }
                .ttd-m{
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-around;
                }
                .ttd-m p{
                    margin: 0;
                }
                .no-print {
                    display: none;
                }
            `;
            var styleBebas =`
                @page{
                    size:potrait;
                    padding: 0;
                    margin-bottom:0;
                }
                body{
                    margin:0;
                    padding: 0;
                    
                }
                .kop{
                    width: 100%;
                    
                }
                .kop .logo-surat{
                    width: 80px;
                    position: absolute;
                    left: 5%;
                }
                .kop h1, h3, p {
                    margin: 0;
                }
                .kop p {
                    font-size: 10pt;
                }
                hr.garis-kop{
                    margin: 5px 30px 20px 30px;
                    border-bottom: double 5px #000;
                    color: #fff;
                }
                .hal{
                    display: flex;
                    justify-content: space-between;
                    padding: 0 50px;
                    
                }
                .isi {
                    margin: 20px 50px;
                    text-align: justify;
                }
                .isi table#tbl_permohonan{
                    margin: 20px auto;
                }
                .isi p {
                    text-indent: 60px;
                }
                .ttd{
                    
                    display: flex;
                    justify-content: space-between;
                    margin: auto 50px;
                }
                .note{
                    font-size: 0.8em;
                    padding-top: 50px;
                    padding-left: 20px;
                }
                .kaki{
                    position: absolute;
                    bottom: 20px;
                    padding-top: 5px;
                    display: flex;
                    justify-content: space-around;
                    border-top: solid 1px #333;
                }
                .foot-p{
                    padding: 10px;
                    font-size: 8pt;
                    background: #2a5892;
                    color: #fff;
                    width: 40%;
                }
            `;
            var style;
            if (berkas == 'monitoring'){
                style = styleMonitoring;
            } else {
                style = styleBebas;
            }
            var html =`
                <html>
                    <head>
                        <title>Cetak Berkas Prakerlap</title>
                        <style>
                            @media print{
                                html, body{
                                    height: 100%;
                                    margin: 0;
                                    padding: 0;
                                }
                            }
                           
                            .text-xs-center{
                                text-align: center;
                            }
                            .kode-pos{
                                position : absolute;
                                right: 5%;
                            }
                            .lembar{
                                position : relative;
                            }
                        `+style+`
                        </style>
                    </head>
                    <body>
                    `+page+`
                    </body>
                </html>

            `;
            newWin.document.write(html);
            setTimeout(function(){
                newWin.print();
                // newWin.close();
            }, 100)
            
            // window.print();
            // var self = this;
            // var no = String(self.no);
            // var data = {no : no};
            // if (self.select.val == 'permohonan' || self.select.val == 'srt_antar') {
            
            // axios.post(self.server+'/api/nosurat', data, {headers: {'X-Access-Token': self.token}})
            //     .then(function(res){
            //         // console.log(res);
            //     });
            // this.get_no();
                
            // }
            // alert(berkas);
        },
        get_no(){
            var self = this;
            axios.get(self.server+'/api/nosurat', {headers: {'X-Access-Token': self.token}})
                .then(function(res){
                    var nmr = Number(res.data.no);
                    self.no = nmr-1;
                    // console.log(nmr);
                    self.no_surat = '421.5/'+(nmr-1)+'/101/6/10.20/III/2018';
                });
        },
        // getRange() 
        getJadwals() {
            var self = this;
            var token = self.token;
            var periode = sessionStorage.getItem('periode');
            axios.get(self.server+'/api/jadwals?periode='+periode, {headers: {'Authorization': 'bearer '+token}})
                .then(res => {
                    // console.log(res.data)
                    self.jadwals = res.data.data;
                });
        },
        btn_srt_antar() {
            alert('Cetak Surat Pengantaran');
        },
        getMyPkl() {
            var self = this;
            var id = sessionStorage.getItem("_id");
            var periode = sessionStorage.getItem("periode");
            axios.get(self.server+'/api/mypkl?id='+id+'&periode='+periode, {headers: {'Authorization': 'bearer '+self.token}})
                .then(function(res){
                    // console.log(res.data)
                    var data = res.data.data;
                    for (var i = 0 ; i < data.length; i++ ) {
                        var itemDudi = {'_id': data[i]._dudi, 'namaDudi': data[i].nama_dudi, 'alamat': data[i].alamat, 'telp': data[i].telp};

                        self.dudis.push(itemDudi);
                    }
                    self.pkls = data;
                });
        },
        getSiswas(i){
            var self = this;
            var id = sessionStorage.getItem("_id");
            var dudi = i._id;
            var periode = sessionStorage.getItem('periode');

            var items = self.pkls;
            self.siswas = []
            items.forEach(function(item) {
                var siswa = {nis: item.nis, nama_siswa: item.nama, kelas: item.kelas, _dudi: item.kode_dudi}
                self.siswas.push(siswa);
            });
            // console.log(i);
            // axios.get(self.server+'/api/getmysiswas?id='+id+"&dudi="+dudi+"&periode="+periode, {headers: {'X-Access-Token': self.token}})
            //     .then(function(res){
            //         if (res.data.length < 1) {
            //             self.snack = true
            //             self.snackMsg = 'Tidak ada data Siswa untuk dudi ini. Mohon hubungi Admin.'
            //             // console.log('Tidak ada data Siswa untuk dudi ini.')
            //         } else {
            //             self.siswas = res.data;
            //             console.log(res.data);
            //         }
                    
                    
            //     });
            // console.log(obj);
        },
        cetak(berkas) {
            // var sheet = document.getElementsByClassName("sheet");
            // window.frames["print_frame"].document.head.innerHTML ="<style> </style>";
            // window.frames["print_frame"].document.body.innerHTML += "<h3 style='text-align:center'>DATA GURU PEMBIMBING</h3>";
            // window.frames["print_frame"].document.body.outerHTML += sheet[0].innerHTML;
            // window.frames["print_frame"].window.focus();
            // window.frames["print_frame"].window.print();
            // console.log(sheet);
            // alert(sheet[0])
            alert(berkas);
        },
        getMonKe(){
            var self = this;
            var jadwals = self.jadwals;
            var now = Date.now();
            // var keg = {}
            var keg = []
            jadwals.filter((i) => {
                var start = new Date(i.start)
                var end = new Date(i.end)
                if ( start < now && end > now) {
                    console.log(i.kegiatan) 
                } else {
                    console.log('halo')
                }
            })
        }
    },
    computed: {
        tahap(){
            // var self = this
            var periode = sessionStorage.getItem('periode')
            var angkatan = periode.split('.')
            return angkatan
        },
        pelaksanaan() {
            var periode = sessionStorage.getItem("Periode")
            var l;
            return l = (periode == '10-2') ? "1 Januari 2018 sampai dengan tanggal 30 Juni 2018" : (periode == '11-1') ? "1 Juli 2018 sampai dengan 31 Desember 2018" : ": ..................................... sampai dengan ....................................." 
        },
        tanggal() {
            var haris = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            var bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober','November', 'Desember'];
            var tanggal = new Date().getDate(),
                _hari = new Date().getDay(),
                _bulan = new Date().getMonth(),
                _tahun = new Date().getYear(),
                hari = haris[_hari],
                bulan = bulans[_bulan],
                tahun = (_tahun < 1000) ? _tahun + 1900 : _tahun;
                return hari + ', '+ tanggal + ' ' + bulan + ' ' + tahun;
        },
        tgl(){
            var haris = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            var bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober','November', 'Desember'];
            var tanggal = new Date().getDate(),
                _hari = new Date().getDay(),
                _bulan = new Date().getMonth(),
                _tahun = new Date().getYear(),
                hari = haris[_hari],
                bulan = bulans[_bulan],
                tahun = (_tahun < 1000) ? _tahun + 1900 : _tahun;
                return ', '+ tanggal + ' ' + bulan + ' ' + tahun;
        },
        kaprog(){
            var self = this;
            var jur = self.selDudi._id;
            if ( jur.substr(1,1) == 'M' || jur.substr(1,1) == 'J') 
            {
                return 'Nanang Wahyudianto, S.Kom';
            } else {
                return 'Sayit Anwar, S.Pd';
            }
        },
        nipKaprog(){
            var self = this;
            var jur = self.selDudi._id;
            if ( jur.substr(1,1) == 'M' || jur.substr(1,1) == 'J') 
            {
                return '19800403 201001 1 021';
            } else {
                return '19751210 201001 1 008';
            }
        },
        monitoringKe () {
            var self = this;
            var jadwals = self.jadwals;
            var now = Date.now();
            // var keg = {}
            var keg = ''
            return jadwals.filter((i) => {
                var start = new Date(i.start)
                var end = new Date(i.end)
                if ( start < now && end > now) {
                   return keg = i
                } 
            })
            // return keg
        },
        progli(){
            var self = this;
            var siswas = self.siswas;
            if (siswas.length < 1) {
                return '..........................';
            
            } else {
                var kelas = siswas[0].kelas.split(' ');
                return kelas[1];
            }
        },
        guru(){
            var self = this;
            var guru = this.$store.state.user;
            return guru;
            // var token = sessionStorage.getItem('token')
            // var role = sessionStorage.getItem('role')
            // var user = sessionStorage.getItem('user')
            // return axios.get(self.server+ '/api/profile?id='+user+'&role='+role, {headers: {'X-Access-Token': token}})
            //     .then( response => {
            //         var guru = response.data[0]
            //         return guru;
            //         // console.log(response)
            //     })
            //     .then(data => {
            //         return guru;
            //     })
            
        },
        siswaterpilih(){
            var self = this;
            var siswas = self.siswas;
            if (siswas.length < 1 ) {
                return [
                    {_id: ' ', nis: '', nama: ' ', progli: ' ', kelas: '', hp: ''},
                    {_id: ' ', nis: '', nama: ' ', progli: ' ', kelas: '', hp: ''},
                    {_id: ' ', nis: '', nama: ' ', progli: ' ', kelas: '', hp: ''},
                    {_id: ' ', nis: '', nama: ' ', progli: ' ', kelas: '', hp: ''},
                    {_id: ' ', nis: '', nama: ' ', progli: ' ', kelas: '', hp: ''},
                    {_id: ' ', nis: '', nama: ' ', progli: ' ', kelas: '', hp: ''}
                ]
            } else {
            return siswas.filter((i) => {
              if(i._dudi == self.selDudi._id) {
                return i;
              }
            });
            }
        },
        dudist() {
            var dudis = this.dudis
            var items = []
            var obj = {}
            // for(let i in dudis) {
            //     obj[i] = dudis[i]._id
            // }
            dudis.forEach(function(item) {
                obj[item._id] = item
            })
            return obj;
        }
    }
}
</script>
<style lang="css">
    /* Monitoring */
    .lembar-monitoring{
        padding: 20px;
        box-sizing: border-box;
        position: relative;
        background: #efefef;
        border: 1px solid #ccc;
        /*box-shadow: 3px 3px 10px rgba(0,0,0,0.5);*/
    }
    .lembar-monitoring .kop-m{
        position: relative;
    }
    .lembar-monitoring .kop-m p {
        margin: 0!important;
    }

    .lembar-monitoring .kop-m .logo{
        position:absolute; margin-left: 100px;margin-top: 3px;
    }
    .lembar-monitoring .kop-m .malang{
        margin: 0!important;
    }
    .lembar-monitoring .kop-m .kode-pos{
        position: absolute;
        right: 10px;
        margin: 0!important;
    }
    .lembar-monitoring .meta-m p {
        margin: 0!important;
    }
    .lembar-monitoring .ttd-m p{
        margin: 0!important;
    }
    .tbl_owner_dudi{
        margin-left: 8%;
    }
    .print {
        padding: 50px;
        background: #eee;
        box-shadow: 0 1px 3px rgba(0,0,0,0.5);
        width: 70%;
        position: relative;
        margin: 20px auto;
        box-sizing: border-box;
    }
    /*#lamp_permohonan{
        margin-top: 0;
        background: #eee;
        padding-top: 100px;
       
    }*/
    .print .kop p, .print .kop h1, .print .kop h3, .print .hal p {
        margin: 0 auto;
    }
    .logo-surat{
        width: 100px;
        /* position: absolute;
        left: 200px; */
    }
    .print hr{
        margin: 10px 0;
        border-bottom: 3px double #333;
    }
    .isi{
        margin-top: 20px;
    }
    .isi p{
        text-indent: 50px;
    }
    .isi ol{
        margin-left: 75px;
        margin-bottom: 20px;
    }
    .td p {
        margin: 0;
        padding: 0;
    }
    .ttd{
        margin-top: 5px;
        margin-bottom: 20px;
    }
    .ttd .note{
        margin-top: 25px;
        font-size: 8pt;
        padding-left: 30px;
    }
    .ttd .note ul{
        margin-left: 20px;
    }
    .kaki{
        position: absolute;
        bottom: 5px;
        border-top: 3px double black;
        box-sizing: border-box;
        padding-top: 5px;
        margin-right: 50px;
        margin-top: 20px;
    }
    .kaki p{
        font-size: 8pt;
        /* line-height: 10pt; */
        background: #143e8d;
        color: #fff;
        padding: 3px;
       
    }
    .foot-logo{
        margin-left: 2px;
    }
    .foot-logo img{
        height: 30px;
        /* margin-left: 1px; */
    }
    #tbl_antar_siswa thead th{
        padding: 5px 20px!important;
        text-align: center;
    }
    #tbl_antar_siswa tbody td,
    #tbl_antar_guru tr td {
        padding: 2px 20px!important;

    }
    #tbl_antar_siswa{
        margin: auto;
    }
    #tbl_antar_guru{
        margin: auto;
    }
    #tbl_ba_antar_siswa th{
        text-align: center;
    }
    #tbl_ba_antar_siswa th, td {
        /* padding: 0 10px; */

    }
    .ttd-ba_antar p{
        margin: 0!important;
    }
    .malang{
        margin-right: 30%;
    }
    .page-spacer{
        height: 200px;
        position: relative;
        background: pink;
    }
    
    @media print{
        .no-print{
            display: none;
        }
        .malang{
        margin-right: 26%;

        }
        .kode-pos{
            margin-right: 5px;
        }
        .print, .lembar-monitoring, #lamp_permohonan{
            display: block;
            background: #fff;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 10000;
            width: 100%;
            height: 100%;
            min-height: 100%;
            padding: 0!Important;
            margin: 0;
        }
        body, html{
            height: 100%;
        }
        .logo-surat{
             width: 75px;
            /* position: absolute; */
            /* left: 30px;  */
        }
        .print .kop h1, .print .kop h3,.print .kop p, .print .hal p{
            margin: 0!important;
            padding: 0;
        }
        .print .kop h1, .print .kop h3,.print .kop p{
            margin: -5px!important;
        }
        .print .kop p{
            font-size: 10pt;
        }
        #srt_permohonan{
            padding: 0 50px!important;
        }
       
       #lamp_permohonan{
            padding: 50px!important;
            width: 100%!important;
            background: #fff;
            margin: 0;
       }
       .sheet{
           background: #fff;
       }
       p.nb{
           position: relative;
           bottom: 0;
       }
       .text-center{
           text-align: center;
       }
    }
        
</style>