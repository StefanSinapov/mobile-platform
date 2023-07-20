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
        if (permission == PermissionStatus.Denied)
        {
            await Shell.Current.DisplayAlert("Permissions Denied", "Unable to take photos.", "OK");
            return;
        }

        try
        {
            FileResult photo = await MediaPicker.Default.CapturePhotoAsync();

            SetPhoto(photo);
        }
        catch (Exception)
        {
            await Shell.Current.DisplayAlert("Error", "Taking photos is not supported on this device", "OK");
            throw;
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

        if (permission == PermissionStatus.Denied)
        {
            await Shell.Current.DisplayAlert("Permissions Denied", "Unable to take photos.", "OK");
            return;
        }

        try
        {
            var photo = await MediaPicker.Default.PickPhotoAsync(new MediaPickerOptions
            {
                Title = "Please pick a photo"
            });

            this.SetPhoto(photo);
        }
        catch (Exception)
        {
            await Shell.Current.DisplayAlert("Error", "Taking photos is not supported on this device", "OK");
            throw;
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
