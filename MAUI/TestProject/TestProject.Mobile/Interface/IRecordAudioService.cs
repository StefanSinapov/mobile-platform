namespace TestProject.Mobile.Interface;

internal interface IRecordAudioService
{
    void StartRecord();
    string StopRecord();
    void PauseRecord();
    void ResetRecord();

    string GetFilePath() => Path.Combine(FileSystem.AppDataDirectory, "Recordings");
}
