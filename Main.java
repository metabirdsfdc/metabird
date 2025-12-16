import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;

public class Main {
    public static void main(String[] args) throws Exception {
        String base64 = "UEsDBBQACAgIAHFfkFsAAAAAAAAAAAAAAAAWAAAAb2JqZWN0cy9BY2NvdW50Lm9iamVjdLWUXU/CMBSG7/kVy+6lwxhjTBnxI6iJURL0mpT2TCtnLbYdAX+9xX2UCSR6sV3tvOc5796dbKWjdY7RCoyVWg3jQT+JI1BcC6nehvHry/jkIh6lPXpTWKfz5/kHcBf5EWWH8btzy0tCrGbLvs204dDnOienSXJOkjOSg2OCORanvchfNJOAwpZFKRSITyyHdPp4NZtxShohMLB2YBTDB5FmDC1QsqMEDNkccOtDSXkbWgY+C2mgmW/qgDjD+GIMIO6lf0uzqdE9fWdks4R0IvkCfcuT2zJ0VwwLmIILUku+hUwq6fzG28APZLVxIW1V7WM/Xvt6e7F3GsXg0F5buICMFejqR9blYbhcb2X8a9cNRI6k+1vqqUT/QXYRu3buJvcEmZOqyLtIHry7yX5ttPqCLpLXzv/JXYlHfpXQrU4WUh8tlOyeU2nvG1BLBwgj1xRtSgEAAN4EAABQSwMEFAAICAgAcV+QWwAAAAAAAAAAAAAAAAsAAABwYWNrYWdlLnhtbE1PwQrCMBS77ytK7/bVoSLSdQxhJw+Ceh61e87h2o61E/17h9vQnF5CSPJE+jINeWLna2cTumScErTalbWtEno554stTWUkjko/VIVkcFuf0HsI7Q7AO9Uyf3OdRqadgZjzDfAVGAyqVEFRGZEBIrxb9OP95QbNdaiUmdaut4GdDllRaAGz/nNaZVDuex+cyWtsSgFfZYyFv1wx/SDXMeMCZhYJmKbL6ANQSwcIBc3zCakAAADsAAAAUEsBAhQAFAAICAgAcV+QWyPXFG1KAQAA3gQAABYAAAAAAAAAAAAAAAAAAAAAAG9iamVjdHMvQWNjb3VudC5vYmplY3RQSwECFAAUAAgICABxX5BbBc3zCakAAADsAAAACwAAAAAAAAAAAAAAAACOAQAAcGFja2FnZS54bWxQSwUGAAAAAAIAAgB9AAAAcAIAAAAA";

        byte[] decoded = Base64.getDecoder().decode(base64);
        Files.write(Paths.get("output.zip"), decoded);

        System.out.println("ZIP file created: output.zip");
    }
}
