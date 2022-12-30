import {Dog} from "../model/Dog";
import {DomSanitizer} from "@angular/platform-browser";

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

  static prepareFormData(dog: Dog, name1: string, name2: string): FormData {
    const formData = new FormData()
    formData.append(
      name1,
      new Blob([JSON.stringify(dog)], {type: 'application/json'})
    )
    if (dog.images) {
      dog.images.forEach(image => {
        formData.append(
          name2,
          image.file,
          image.file.name)
      })
    }
    return formData
  }
}
