using Microsoft.Maui.Controls.Maps;
using Microsoft.Maui.Maps;
using System.Diagnostics;
using TestProject.Mobile.ViewModels;

namespace TestProject.Mobile.Views;

public partial class MapPage : ContentPage
{
    private CancellationTokenSource _cancelTokenSource;
    private bool _isCheckingLocation;

    public MapPage()
    {
        InitializeComponent();
        this.ClearSelectionButton.IsVisible = false;
        BindingContext = new PinItemsSourcePageViewModel();
        map.MoveToRegion(MapSpan.FromCenterAndRadius(new Location(42.683381890105764, 23.35473960346132), Distance.FromKilometers(10)));
    }


    void OnSliderValueChanged(object sender, ValueChangedEventArgs e)
    {
        double zoomLevel = e.NewValue;
        double latlongDegrees = 360 / (Math.Pow(2, zoomLevel));
        if (map.VisibleRegion != null)
        {
            map.MoveToRegion(new MapSpan(map.VisibleRegion.Center, latlongDegrees, latlongDegrees));
        }
    }

    void OnButtonClicked(object sender, EventArgs e)
    {
        Button button = sender as Button;
        switch (button.Text)
        {
            case "Street":
                map.MapType = MapType.Street;
                break;
            case "Satellite":
                map.MapType = MapType.Satellite;
                break;
            case "Hybrid":
                map.MapType = MapType.Hybrid;
                break;
        }
    }

    void OnMapClicked(object sender, MapClickedEventArgs e)
    {
        Debug.WriteLine($"MapClick: {e.Location.Latitude}, {e.Location.Longitude}");

        if (map.Pins.Count(p => p.Type == PinType.Generic) == 0)
        {
            var pin = new Pin
            {
                Type = PinType.Generic,
                Location = e.Location,
                Label = "Pin",
                Address = "Pin Address"
            };
            map.Pins.Add(pin);
            this.ClearSelectionButton.IsVisible = true;
        }
    }

    private void ClearSelectionButtonClicked(object sender, EventArgs e)
    {
        this.ClearSelectionButton.IsVisible = false;
        map.Pins.Clear();
    }

    private async void GetCurrentLocationButton_Clicked(object sender, EventArgs e)
    {
        try
        {
            _isCheckingLocation = true;

            GeolocationRequest request = new(GeolocationAccuracy.Medium, TimeSpan.FromSeconds(10));

            _cancelTokenSource = new CancellationTokenSource();

            Location location = await Geolocation.Default.GetLocationAsync(request, _cancelTokenSource.Token);

            if (location != null)
            {
                Debug.WriteLine($"Latitude: {location.Latitude}, Longitude: {location.Longitude}, Altitude: {location.Altitude}");

                map.Pins.Add(new Pin
                {
                    Type = PinType.SavedPin,
                    Label = "Current Location",
                    Location = location
                });
            }
        }
        // Catch one of the following exceptions:
        //   FeatureNotSupportedException
        //   FeatureNotEnabledException
        //   PermissionException
        catch (Exception ex)
        {
            // Unable to get location
            Debug.WriteLine($"Unable to get location: {ex.Message}");
        }
        finally
        {
            _isCheckingLocation = false;
        }
    }
}