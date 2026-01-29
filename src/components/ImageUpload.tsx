import { useState, useRef, useCallback } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Upload,
  X,
  Crop as CropIcon,
  Check,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "./Button";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export function ImageUpload({
  value,
  onChange,
  label = "Image",
  aspectRatio,
  maxWidth = 800,
  maxHeight = 800,
}: ImageUploadProps) {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showCrop, setShowCrop] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Handle file selection
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result?.toString() || "");
        setShowCrop(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Create a canvas with the cropped image
  const getCroppedImg = useCallback(
    (image: HTMLImageElement, crop: PixelCrop): Promise<Blob> => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const cropWidth = crop.width * scaleX;
      const cropHeight = crop.height * scaleY;

      // Calculate dimensions respecting max width/height
      let targetWidth = cropWidth;
      let targetHeight = cropHeight;

      if (targetWidth > maxWidth || targetHeight > maxHeight) {
        const ratio = Math.min(
          maxWidth / targetWidth,
          maxHeight / targetHeight,
        );
        targetWidth *= ratio;
        targetHeight *= ratio;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return Promise.reject(new Error("No 2d context"));
      }

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        cropWidth,
        cropHeight,
        0,
        0,
        targetWidth,
        targetHeight,
      );

      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas is empty"));
              return;
            }
            resolve(blob);
          },
          "image/jpeg",
          0.9,
        );
      });
    },
    [maxWidth, maxHeight],
  );

  // Upload to Cloudinary
  const uploadToCloudinary = async (blob: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", cloudinaryUploadPreset);
    formData.append("folder", "heartopia");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  };

  // Handle crop and upload
  const handleCropComplete = async () => {
    if (!completedCrop || !imgRef.current) return;

    try {
      setUploading(true);
      const croppedBlob = await getCroppedImg(imgRef.current, completedCrop);
      const uploadedUrl = await uploadToCloudinary(croppedBlob);
      onChange(uploadedUrl);
      setShowCrop(false);
      setImageSrc("");
      setCrop(undefined);
      setCompletedCrop(undefined);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Handle URL input
  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setShowUrlInput(false);
    }
  };

  // Handle image load for default crop
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspectRatio) {
      const { width, height } = e.currentTarget;
      const cropWidth = Math.min(width, height * aspectRatio);
      const cropHeight = cropWidth / aspectRatio;
      const x = (width - cropWidth) / 2;
      const y = (height - cropHeight) / 2;

      setCrop({
        unit: "px",
        x,
        y,
        width: cropWidth,
        height: cropHeight,
      });
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Image Preview */}
      {value && !showCrop && (
        <div className="relative w-full h-48 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23cbd5e0" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" ry="2"%3E%3C/rect%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"%3E%3C/circle%3E%3Cpolyline points="21 15 16 10 5 21"%3E%3C/polyline%3E%3C/svg%3E';
            }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Crop Modal */}
      {showCrop && imageSrc && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <CropIcon className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Crop Image
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowCrop(false);
                  setImageSrc("");
                  setCrop(undefined);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4 text-sm text-gray-600">
                Drag to select the area you want to keep
              </div>
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspectRatio}
                className="max-h-[60vh]"
              >
                <img
                  ref={imgRef}
                  src={imageSrc}
                  alt="Crop preview"
                  onLoad={onImageLoad}
                  className="max-w-full"
                />
              </ReactCrop>
            </div>

            <div className="flex gap-3 justify-end p-4 border-t border-gray-200">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowCrop(false);
                  setImageSrc("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={handleCropComplete}
                disabled={!completedCrop || uploading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Crop & Upload
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* URL Input Modal */}
      {showUrlInput && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Enter Image URL
              </h3>
              <button
                type="button"
                onClick={() => setShowUrlInput(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleUrlSubmit();
                  }
                }}
              />

              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowUrlInput(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleUrlSubmit}
                  disabled={!urlInput.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Add URL
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Buttons */}
      {!value && !showCrop && (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="hidden"
          />
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-gray-700 hover:text-purple-600"
            >
              <Upload className="w-5 h-5" />
              <span className="text-sm font-medium">Upload Image</span>
            </button>

            <button
              type="button"
              onClick={() => setShowUrlInput(true)}
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-gray-700 hover:text-purple-600"
            >
              <ImageIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Add URL</span>
            </button>
          </div>

          {!cloudinaryCloudName || !cloudinaryUploadPreset ? (
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded p-2">
              ⚠️ Cloudinary not configured. Please add
              VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to
              your .env file.
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
