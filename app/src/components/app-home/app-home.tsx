import { Component, h, State } from '@stencil/core';
import { Axios } from '../../global/network';
import { apis } from '../../global/resources';
import { getWordParts } from '../../helpers';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  private inputFileUploader?: HTMLInputElement

  /**
   *
   */
  @State() keywords : string = ''

  /**
   *
   */
  @State() title: string = 'Upload Document'

  /**
   *
   */
  handleFileOnClick = () => {
      this.inputFileUploader?.click()
  }

  /**
   *
   * @returns
   */
  handleOnEncrypt = async () => {
    if(this.inputFileUploader.files.length === 0){
      return alert('No file choosen. Pick select a file')
    }
    const formattedString = this.keywords.replace(/["]+/g, "\'")

    const words = getWordParts(formattedString)
    const formData = new FormData()

    formData.append('secretFile', this.inputFileUploader.files[0])

    words.forEach((item, i) => {
      formData.append(`keywords[${i}]`, item)
    })

    // using a node server
    const response = await Axios.post(apis['ENCRYPT_DOC'], formData, {
       headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'blob'
    })

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.txt'); //or any other extension
    document.body.appendChild(link);
    link.click();

    // without node server

    const reader = new FileReader()

   if(this.inputFileUploader.files.length > 0){
     reader.onload = async (e) => {
      e.preventDefault()

      const text = (e.target.result);



       const keywords: string[] = words;



        let updatedContent = text.toString();

        keywords.forEach(item => {
          const regex = new RegExp(item, 'g')
          updatedContent = updatedContent.replace(regex, 'XXXX')
        })

        updatedContent += '\nKeywords: ' + keywords.join(',')

         this.download('encrypt.txt', updatedContent)

    }

    reader.readAsText(this.inputFileUploader.files[0])
   }
  }

  /**
   *
   */
  handleOnFileSelect = () => {
    this.title = this.inputFileUploader.files[0]?.name

  }

  /**
   *
   * @param filename
   * @param text
   */
  download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  // element.click();

  document.body.removeChild(element);
}

  /**
   *
   * @returns JSX
   */
  render() {
    return (
      <div class="app-home">

          <div class=''>
            <div class="container">
            <div class="row">
              <div class="col-md-12">
               <div class="shadow p-3 mb-5 bg-body rounded">
                <div class='load-content col'>
                  <div class='my-3'></div>
                    <div class='load-content-title my-3'>
                        {this.title}
                    </div>
                    <div class="load-content-subtitle my-3">
                      Use the button below to upload your documents. File supported is Text formats.
                    </div>
                    <div class='my-3'></div>
                  <div class="p-3 d-flex justify-content-center">

                    <button onClick={this.handleFileOnClick} class="new-btn btn-orange">Browse File</button>
                    <input onInput={this.handleOnFileSelect} class='hidden' ref={el => this.inputFileUploader = el as HTMLInputElement} id="file-uploader" type='file'  accept='.txt' />
                    </div>
                </div>
                <div class='my-3 d-flex'>
                  <div class='w-50 col'>
                    <textarea onInput={(e: any) => {
                      this.keywords = e.target.value
                    }} value={this.keywords}  placeholder='Enter Keywords'></textarea>

                  </div>
                  <div class='w-50 col'>
                    <button onClick={this.handleOnEncrypt} class="new-btn btn-blue">Encrypt</button>
                  </div>
                </div>
               </div>

              </div>
            </div>
          </div>
          </div>


      </div>
    );
  }
}
