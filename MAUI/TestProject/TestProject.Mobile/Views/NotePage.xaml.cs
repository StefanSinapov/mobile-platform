using TestProject.Mobile.Models;

namespace TestProject.Mobile.Views;

[QueryProperty(nameof(ItemId), nameof(ItemId))]
public partial class NotePage : ContentPage
{
    public NotePage()
    {
        InitializeComponent();

        string appDataPath = FileSystem.AppDataDirectory;
        string randomFileName = $"{Path.GetRandomFileName()}.notes.txt";

        LoadNote(Path.Combine(appDataPath, randomFileName));
    }

    public string ItemId
    {
        set
        {
            LoadNote(value);
        }
    }

    private void LoadNote(string fileName)
    {
        var noteModel = new Note
        {
            FileName = fileName
        };

        if (File.Exists(fileName))
        {
            noteModel.Date = File.GetCreationTime(fileName);
            noteModel.Text = File.ReadAllText(fileName);
        }

        BindingContext = noteModel;
    }

    private async void SaveButton_Clicked(object sender, EventArgs e)
    {
        if(BindingContext is Note note)
        {
            await File.WriteAllTextAsync(note.FileName, TextEditor.Text);
        }

        await Shell.Current.GoToAsync("..");
    }

    private async void DeleteButton_Clicked(object sender, EventArgs e)
    {
        var confirm = await DisplayAlert("Are you sure?", "This action is not revertable!", "Yes", "Cancel");

        if (confirm && BindingContext is Note note)
        {
            if (File.Exists(note.FileName))
            {
                File.Delete(note.FileName);
            }

            TextEditor.Text = string.Empty;

            await Shell.Current.GoToAsync("..");
        }
    }
}