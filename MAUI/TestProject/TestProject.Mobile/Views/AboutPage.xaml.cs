namespace TestProject.Mobile.Views;

public partial class AboutPage : ContentPage
{
    public AboutPage()
    {
        InitializeComponent();
    }

    private async void Button_Clicked(object sender, EventArgs e)
    {
        if (BindingContext is Models.About about)
        {
            // Navigate to the specified URL in the system browser
            await Launcher.Default.OpenAsync(about.MoreInfoUrl);
        }
    }
}