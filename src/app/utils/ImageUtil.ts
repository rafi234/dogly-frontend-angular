import {DomSanitizer} from "@angular/platform-browser";
import {FileHandle} from "../model/file-handle";

export class ImageUtil {

  static onFileSelected($event: Event, sanitizer: DomSanitizer): any {
    const element = $event.currentTarget as HTMLInputElement
    if (element.files) {
      const file = element.files[0]
      return {
        file: file,
        url: sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
    }
  }

  static prepareFormData(object: any, name1: string, name2: string): FormData {
    const formData = new FormData()
    formData.append(
      name1,
      new Blob([JSON.stringify(object)], {type: 'application/json'})
    )
    if (object.images) {
      object.images.forEach((image: FileHandle) => {
        formData.append(
          name2,
          image.file,
          image.file.name)
      })
    }
    return formData
  }
}
