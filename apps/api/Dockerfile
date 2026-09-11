FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY global.json Directory.Build.props QuitLoop.sln ./
COPY src/QuitLoop.Api/QuitLoop.Api.csproj src/QuitLoop.Api/
RUN dotnet restore src/QuitLoop.Api/QuitLoop.Api.csproj

COPY src/QuitLoop.Api/ src/QuitLoop.Api/
RUN dotnet publish src/QuitLoop.Api/QuitLoop.Api.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
USER $APP_UID
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "QuitLoop.Api.dll"]
