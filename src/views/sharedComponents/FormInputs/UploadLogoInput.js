import React from "react";

export default function UploadLogoInput(props) {
  const handleChange = (event) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(event.target.value)) {
      alert("Invalid file type");
      event.target.value = "";
      return false;
    } else {
      props.onUploadLogoInputChange(event.target.files[0]);
    }
  };
  return (
    <div class="input-group">
      <label for="file">please upload your logo: </label>
      <input
        type="file"
        style={{ width: "100%" }}
        onChange={handleChange}
        accept="image/png, image/jpeg, image/jpg"
      />
    </div>
  );
}
