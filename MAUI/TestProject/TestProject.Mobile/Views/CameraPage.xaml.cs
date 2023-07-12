namespace TestProject.Mobile.Views;

public partial class CameraPage : ContentPage
{
    public CameraPage()
    {
        InitializeComponent();
    }

    private async void TakePhotoButton_Clicked(object sender, EventArgs e)
    {
        var permission = await Permissions.CheckStatusAsync<Permissions.Camera>();
        if (permission != PermissionStatus.Granted)
        {
            await Shell.Current.DisplayAlert("Permissions Denied", "Unable to take photos.", "OK");
        }

        if (!MediaPicker.Default.IsCaptureSupported)
        {
            await Shell.Current.DisplayAlert("Error", "Taking photos is not supported on this device", "OK");
        }
        else
        {
            FileResult photo = await MediaPicker.Default.CapturePhotoAsync();

            SetPhoto(photo);
        }
    }

    private async void PickPhotoButton_Clicked(object sender, EventArgs e)
    {
        var permission = await Permissions.CheckStatusAsync<Permissions.StorageRead>();

#if IOS || MAC
        permission = await Permissions.CheckStatusAsync<Permissions.Photos>();
#endif
#if ANDROID33_0_OR_GREATER
        permission = await Permissions.CheckStatusAsync<Permissions.Media>();
#endif

        if (permission != PermissionStatus.Granted)
        {
            await Shell.Current.DisplayAlert("Permissions Denied", "Unable to take photos.", "OK");
        }

        if (MediaPicker.Default.IsCaptureSupported)
        {
            var photo = await MediaPicker.Default.PickPhotoAsync(new MediaPickerOptions
            {
                Title = "Please pick a photo"
            });

            this.SetPhoto(photo);
        }
        else
        {
            await Shell.Current.DisplayAlert("Error", "Taking photos is not suported on this device", "OK");
        }
    }

    private void SetPhoto(FileResult photo)
    {
        if (photo != null)
        {
            // Display the photo on the screen
            CapturedPhoto.Source = ImageSource.FromStream(() => photo.OpenReadAsync().Result);
        }
    }
}
