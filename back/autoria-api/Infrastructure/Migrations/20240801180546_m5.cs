using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class m5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Likes",
                table: "News",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Region",
                table: "Cars",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Likes",
                table: "News");

            migrationBuilder.DropColumn(
                name: "Region",
                table: "Cars");
        }
    }
}
