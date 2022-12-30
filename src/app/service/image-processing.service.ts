import {Injectable} from '@angular/core';
import {FileHandle} from "../model/file-handle";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) {
  }

  createImages(images: any[]): FileHandle[] {
    const imagesToFileHandle: FileHandle[] = []

    images.forEach(img => {
        const imageBlob = this.dataURItoBlob(img.picByte, img.type);
        const imageFile = new File([imageBlob], img.name, {type: img.type})
        const finalFileHandle: FileHandle = {
          file: imageFile,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
        }
        imagesToFileHandle.push(finalFileHandle)
      }
    )

    return imagesToFileHandle
  }

  dataURItoBlob(picByte: any, imageType: string) {
    const byteString = window.atob(picByte)
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const int8Array = new Uint8Array(arrayBuffer)

    for (let i = 0; i < byteString.length; ++i) {
      int8Array[i] = byteString.charCodeAt(i)
    }

    return new Blob([int8Array], {type: imageType})
  }
}
